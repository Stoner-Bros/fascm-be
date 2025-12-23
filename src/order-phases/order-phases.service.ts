import { OrderSchedule } from '../order-schedules/domain/order-schedule';
import { OrderSchedulesService } from '../order-schedules/order-schedules.service';
import { OrderScheduleValidationService } from '../order-schedules/validators/order-schedule-validation.service';

import {
  BadRequestException,
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AreasService } from 'src/areas/areas.service';
import { ExportTicketRepository } from 'src/export-tickets/infrastructure/persistence/export-ticket.repository';
import { FilesCloudinaryService } from 'src/files/infrastructure/uploader/cloudinary/files.service';
import { ImageProofsService } from 'src/image-proofs/image-proofs.service';
import { OrderDetailSelectionRepository } from 'src/order-detail-selections/infrastructure/persistence/order-detail-selection.repository';
import { OrderDetailSelectionsService } from 'src/order-detail-selections/order-detail-selections.service';
import { OrderInvoiceDetailRepository } from 'src/order-invoice-details/infrastructure/persistence/order-invoice-detail.repository';
import { OrderInvoiceRepository } from 'src/order-invoices/infrastructure/persistence/order-invoice.repository';
import { OrderScheduleStatusEnum } from 'src/order-schedules/enum/order-schedule-status.enum';
import { ProductsService } from 'src/products/products.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderPhase } from './domain/order-phase';
import {
  CreateMultipleOrderPhaseDto,
  CreateOrderPhaseDto,
} from './dto/create-order-phase.dto';
import { UpdateOrderPhaseDto } from './dto/update-order-phase.dto';
import { OrderPhaseStatusEnum } from './enum/order-phase-status.enum';
import { OrderPhaseRepository } from './infrastructure/persistence/order-phase.repository';

@Injectable()
export class OrderPhasesService {
  constructor(
    @Inject(forwardRef(() => ImageProofsService))
    private readonly imageProofService: ImageProofsService,
    private readonly filesCloudinaryService: FilesCloudinaryService,
    private readonly productService: ProductsService,

    @Inject(forwardRef(() => OrderSchedulesService))
    private readonly orderScheduleService: OrderSchedulesService,

    @Inject(forwardRef(() => OrderScheduleValidationService))
    private readonly orderScheduleValidationService: OrderScheduleValidationService,

    private readonly orderInvoiceRepository: OrderInvoiceRepository,
    private readonly orderInvoiceDetailRepository: OrderInvoiceDetailRepository,

    // Export ticket related dependencies (merged from ExportTicketsService)
    @Inject(forwardRef(() => OrderDetailSelectionsService))
    private readonly orderDetailSelectionsService: OrderDetailSelectionsService,

    @Inject(forwardRef(() => OrderDetailSelectionRepository))
    private readonly orderDetailSelectionsRepository: OrderDetailSelectionRepository,

    @Inject(forwardRef(() => AreasService))
    private readonly areasService: AreasService,

    private readonly exportTicketRepository: ExportTicketRepository,

    // Dependencies here
    private readonly orderPhaseRepository: OrderPhaseRepository,
  ) {}

  async create(createOrderPhaseDto: CreateOrderPhaseDto) {
    // Do not remove comment below.
    // <creating-property />

    // 1. Batch fetch all required data upfront to reduce N+1 queries
    const productIds = [
      ...new Set(
        createOrderPhaseDto.orderInvoiceDetails.map((oid) => oid.product.id),
      ),
    ];

    // Collect all selectionIds for batch fetching
    const allSelectionIds = createOrderPhaseDto.orderInvoiceDetails
      .flatMap((oid) => oid.selectionIds || [])
      .filter((id) => id);

    const [os, products, allSelections] = await Promise.all([
      this.orderScheduleService.findById(createOrderPhaseDto.orderSchedule.id),
      this.productService.findByIds(productIds),
      allSelectionIds.length > 0
        ? this.orderDetailSelectionsService.findByIds(allSelectionIds)
        : Promise.resolve([]),
    ]);

    if (!os) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          orderSchedule: 'notExists',
        },
      });
    }

    // Create a product map for O(1) lookup
    const productMap = new Map(products.map((p) => [p.id, p]));

    // Validate all products exist
    const missingProducts = productIds.filter((id) => !productMap.has(id));
    if (missingProducts.length > 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: `Products not found: ${missingProducts.join(', ')}`,
        },
      });
    }

    // Validate all selections exist
    if (allSelectionIds.length > 0) {
      const selectionMap = new Map(allSelections.map((s) => [s.id, s]));
      const missingSelections = allSelectionIds.filter(
        (id) => !selectionMap.has(id),
      );
      if (missingSelections.length > 0) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            selectionBatches: `Selections not found: ${missingSelections.join(', ')}`,
          },
        });
      }
    }

    // Validate that adding this phase won't exceed schedule limits
    const invoiceDetailsForValidation =
      createOrderPhaseDto.orderInvoiceDetails.map((oidDto) => ({
        productId: oidDto.product.id,
        quantity: oidDto.quantity || 0,
      }));

    await this.orderScheduleValidationService.validatePhaseAddition(
      createOrderPhaseDto.orderSchedule.id,
      invoiceDetailsForValidation,
    );

    // 2. Create order phase and order invoice
    const op = await this.orderPhaseRepository.create({
      description: createOrderPhaseDto.description || '',
      phaseNumber: createOrderPhaseDto.phaseNumber || 0,
      orderSchedule: os,
    });

    const oi = await this.orderInvoiceRepository.create({
      totalPayment: 0,
      totalAmount: 0,
      quantity: 0,
      unit: 'kg',
      vatAmount: 0,
      taxRate: createOrderPhaseDto?.orderInvoice?.taxRate || 0,
      invoiceNumber: createOrderPhaseDto?.orderInvoice?.invoiceNumber || 0,
      invoiceUrl: createOrderPhaseDto?.orderInvoice?.invoiceUrl || '',
      orderPhase: op,
    });

    // 3. Create all order invoice details in parallel
    const invoiceDetailPromises = createOrderPhaseDto.orderInvoiceDetails.map(
      (oidDto) => {
        const product = productMap.get(oidDto.product.id)!;
        return this.orderInvoiceDetailRepository.create({
          taxRate: 0,
          quantity: oidDto.quantity,
          unit: oidDto.unit,
          orderInvoice: oi,
          product: product,
        });
      },
    );

    const createdInvoiceDetails = await Promise.all(invoiceDetailPromises);

    // 4. Calculate totals and prepare export ticket data
    let totalAmount = 0;
    let quantity = 0;
    const createdInvoiceDetailsWithSelections: {
      orderInvoiceDetail: (typeof createdInvoiceDetails)[0];
      selectionIds: string[];
      productId: string;
    }[] = [];

    createdInvoiceDetails.forEach((oid, index) => {
      totalAmount += oid.amount || 0;
      quantity += oid.quantity || 0;

      const oidDto = createOrderPhaseDto.orderInvoiceDetails[index];
      if (oidDto.selectionIds && oidDto.selectionIds.length > 0) {
        createdInvoiceDetailsWithSelections.push({
          orderInvoiceDetail: oid,
          selectionIds: oidDto.selectionIds,
          productId: oidDto.product.id,
        });
      }
    });

    // 5. Calculate VAT
    let vatAmount = totalAmount * ((oi.taxRate || 0) / 100);
    vatAmount = Math.round(vatAmount * 100) / 100;

    // 6. Create export tickets inline if there are selections (merged from ExportTicketsService)
    if (createdInvoiceDetailsWithSelections.length > 0) {
      // Create selection map for O(1) lookup
      const selectionMap = new Map(allSelections.map((s) => [s.id, s]));

      // Collect all unique area IDs for batch fetching
      const areaIds = [
        ...new Set(
          allSelections
            .map((s) => s.batch?.area?.id)
            .filter((id): id is string => !!id),
        ),
      ];
      const areas = await this.areasService.findByIds(areaIds);
      const areaMap = new Map(areas.map((a) => [a.id, a]));

      // Process each invoice detail with selections
      for (const detail of createdInvoiceDetailsWithSelections) {
        const selectionBatches = detail.selectionIds
          .map((id) => selectionMap.get(id))
          .filter((s) => s !== undefined);

        // Validate product matches
        for (const selectionBatch of selectionBatches) {
          if (selectionBatch.batch?.product?.id !== detail.productId) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                batch: `Batch with id ${selectionBatch.batch?.id} has different product than OrderInvoiceDetail`,
              },
            });
          }
        }

        const areaId = selectionBatches[0]?.batch?.area?.id;
        const area = areaId ? areaMap.get(areaId) : null;
        if (!area) {
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              area: `Area with id ${areaId} not found`,
            },
          });
        }

        // Create export ticket
        const exportTicket = await this.exportTicketRepository.create({
          exportDate: new Date(),
          unit: detail.orderInvoiceDetail.unit,
          quantity: detail.orderInvoiceDetail.quantity,
        });

        // Calculate amounts from selections and update them in parallel
        let amountSelected = 0;
        let amountMoney = 0;
        const selectionUpdatePromises = selectionBatches.map(
          (selectionBatch) => {
            amountSelected += selectionBatch.quantity || 0;
            amountMoney +=
              (selectionBatch.quantity || 0) * (selectionBatch.unitPrice || 0);
            return this.orderDetailSelectionsRepository.update(
              selectionBatch.id,
              {
                exportTicket,
              },
            );
          },
        );

        await Promise.all(selectionUpdatePromises);

        // Update order invoice detail with export ticket and calculated amounts
        detail.orderInvoiceDetail.exportTicket = exportTicket;
        detail.orderInvoiceDetail.amount = amountMoney;
        detail.orderInvoiceDetail.quantity = amountSelected;
        await this.orderInvoiceDetailRepository.update(
          detail.orderInvoiceDetail.id,
          {
            exportTicket,
            amount: amountMoney,
            quantity: amountSelected,
          },
        );

        // Recalculate totals with actual selection amounts
        totalAmount += amountMoney;

        // Update area quantity
        area.quantity = (area.quantity || 0) - amountSelected;
        await this.areasService.update(area.id, { quantity: area.quantity });
      }

      // Recalculate VAT with updated totals
      vatAmount = totalAmount * ((oi.taxRate || 0) / 100);
      vatAmount = Math.round(vatAmount * 100) / 100;
    }

    const totalPayment = totalAmount + vatAmount;

    // 7. Update invoice
    await this.orderInvoiceRepository.update(oi.id, {
      vatAmount,
      totalPayment,
      totalAmount,
      quantity,
    });

    // 8. Update order schedule status if needed
    if (os.status === OrderScheduleStatusEnum.APPROVED) {
      await this.orderScheduleService.updateStatus(
        os.id,
        OrderScheduleStatusEnum.PROCESSING,
      );
    }

    return op;
  }

  async createMultiple(
    createMultipleOrderPhaseDto: CreateMultipleOrderPhaseDto,
  ) {
    const results: any[] = [];
    for (const phaseDto of createMultipleOrderPhaseDto.orderPhases) {
      const result = await this.create(phaseDto);
      results.push(result);
    }
    return results;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderPhaseRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllByScheduleWithPagination({
    orderScheduleId,
    paginationOptions,
  }: {
    orderScheduleId: string;
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderPhaseRepository.findAllByScheduleWithPagination({
      scheduleId: orderScheduleId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderPhase['id']) {
    return this.orderPhaseRepository.findFullById(id);
  }

  findByIds(ids: OrderPhase['id'][]) {
    return this.orderPhaseRepository.findByIds(ids);
  }

  async update(
    id: OrderPhase['id'],

    updateOrderPhaseDto: UpdateOrderPhaseDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let orderPhase: any = await this.orderPhaseRepository.findFullById(id);
    if (!orderPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }
    const orderScheduleFromOrderPhase =
      await this.orderPhaseRepository.findById(id);

    orderPhase = {
      ...orderPhase,
      orderSchedule: orderScheduleFromOrderPhase?.orderSchedule,
    };

    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (updateOrderPhaseDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        updateOrderPhaseDto.orderSchedule.id,
      );
      if (!orderScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderSchedule: 'notExists',
          },
        });
      }
      orderSchedule = orderScheduleObject;
    } else if (updateOrderPhaseDto.orderSchedule === null) {
      orderSchedule = null;
    }

    // Update order invoice if provided
    if (updateOrderPhaseDto.orderInvoice && orderPhase.orderInvoice) {
      const oi = orderPhase.orderInvoice;
      const oldOrderInvoiceDetails =
        await this.orderInvoiceDetailRepository.findByInvoiceId(oi.id);

      // Remove old order invoice details
      if (oldOrderInvoiceDetails) {
        for (const oldOid of oldOrderInvoiceDetails) {
          await this.orderInvoiceDetailRepository.remove(oldOid.id);
        }
      }
      // Update order invoice details if provided
      if (
        updateOrderPhaseDto.orderInvoiceDetails &&
        updateOrderPhaseDto.orderInvoiceDetails.length > 0
      ) {
        // Validate that updating this phase won't exceed schedule limits
        if (orderPhase.orderSchedule?.id) {
          const invoiceDetailsForValidation =
            updateOrderPhaseDto.orderInvoiceDetails.map((oidDto) => ({
              productId: oidDto.product.id,
              quantity: oidDto.quantity || 0,
            }));

          await this.orderScheduleValidationService.validatePhaseAddition(
            orderPhase.orderSchedule.id,
            invoiceDetailsForValidation,
            id, // exclude current phase from validation
          );
        }

        let totalAmount = 0;
        let quantity = 0;

        // Create new order invoice details
        for (const oidDto of updateOrderPhaseDto.orderInvoiceDetails) {
          const product = await this.productService.findById(oidDto.product.id);
          if (!product) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                product: 'notExists',
              },
            });
          }
          const oid = await this.orderInvoiceDetailRepository.create({
            taxRate: 0,
            // amount: (oidDto.unitPrice || 0) * (oidDto.quantity || 0),
            // unitPrice: oidDto.unitPrice,
            quantity: oidDto.quantity,
            unit: oidDto.unit,
            orderInvoice: oi,
            product: product,
          });
          totalAmount += oid.amount || 0;
          quantity += oid.quantity || 0;
        }

        // Calculate VAT and total payment
        const taxRate =
          updateOrderPhaseDto.orderInvoice.taxRate ?? oi.taxRate ?? 0;
        let vatAmount = totalAmount * (taxRate / 100);
        // Round to 2 decimal places
        vatAmount = Math.round(vatAmount * 100) / 100;
        const totalPayment = totalAmount + vatAmount;

        // Update order invoice
        await this.orderInvoiceRepository.update(oi.id, {
          totalPayment: totalPayment,
          totalAmount: totalAmount,
          quantity: quantity,
          vatAmount: vatAmount,
          taxRate: taxRate,
          invoiceNumber:
            updateOrderPhaseDto?.orderInvoice?.invoiceNumber ??
            oi.invoiceNumber,
          invoiceUrl:
            updateOrderPhaseDto?.orderInvoice?.invoiceUrl ?? oi.invoiceUrl,
        });
      } else {
        // Only update invoice metadata without details
        await this.orderInvoiceRepository.update(oi.id, {
          taxRate: updateOrderPhaseDto?.orderInvoice?.taxRate ?? oi.taxRate,
          invoiceNumber:
            updateOrderPhaseDto?.orderInvoice?.invoiceNumber ??
            oi.invoiceNumber,
          invoiceUrl:
            updateOrderPhaseDto?.orderInvoice?.invoiceUrl ?? oi.invoiceUrl,
        });
      }
    }

    return this.orderPhaseRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateOrderPhaseDto.description,

      // status: updateOrderPhaseDto.status,

      phaseNumber: updateOrderPhaseDto.phaseNumber,

      orderSchedule,
    });
  }

  remove(id: OrderPhase['id']) {
    return this.orderPhaseRepository.remove(id);
  }

  //upload img proof for harvest schedule
  async uploadImgProof(
    id: OrderPhase['id'],
    file: Express.Multer.File,
  ): Promise<{ path: string }> {
    const orderPhase = await this.orderPhaseRepository.findById(id);
    if (!orderPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'notExists' },
      });
    }
    const uploadedFile = await this.filesCloudinaryService.uploadFile(file);
    await this.imageProofService.create({
      orderPhase: orderPhase,
      photo: uploadedFile,
    });
    return { path: uploadedFile.path };
  }

  async updateStatus(id: OrderPhase['id'], status: OrderPhase['status']) {
    const orderPhase = await this.orderPhaseRepository.findById(id);
    if (!orderPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = orderPhase.status;
    // Define allowed status transitions
    const allowedTransitions: Record<string, OrderPhaseStatusEnum[]> = {
      preparing: [
        OrderPhaseStatusEnum.DELIVERING,
        OrderPhaseStatusEnum.CANCELED,
      ],
      delivering: [
        OrderPhaseStatusEnum.DELIVERED,
        OrderPhaseStatusEnum.CANCELED,
      ],
      delivered: [
        OrderPhaseStatusEnum.COMPLETED,
        OrderPhaseStatusEnum.CANCELED,
      ],
      completed: [],
    };

    // Validate status transition
    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as OrderPhaseStatusEnum,
      )
    ) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          status: `invalidTransitionFrom${currentStatus}To${status}`,
        },
      });
    }

    return this.orderPhaseRepository.update(id, {
      status,
      updatedAt: new Date(),
    });
  }

  async getTotalPaymentByPhaseId(phaseId: string): Promise<number> {
    const orderPhase = await this.orderPhaseRepository.findFullById(phaseId);
    if (!orderPhase || !orderPhase.orderInvoice) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          phaseId: 'notExists',
        },
      });
    }
    return orderPhase.orderInvoice.totalPayment || 0;
  }
}
