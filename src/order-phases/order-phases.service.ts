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
import { FilesCloudinaryService } from 'src/files/infrastructure/uploader/cloudinary/files.service';
import { ImageProofsService } from 'src/image-proofs/image-proofs.service';
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

    // Dependencies here
    private readonly orderPhaseRepository: OrderPhaseRepository,
  ) {}

  async create(createOrderPhaseDto: CreateOrderPhaseDto) {
    // Do not remove comment below.
    // <creating-property />

    const os = await this.orderScheduleService.findById(
      createOrderPhaseDto.orderSchedule.id,
    );
    if (!os) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          orderSchedule: 'notExists',
        },
      });
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

    const op = await this.orderPhaseRepository.create({
      description: createOrderPhaseDto.description,
      phaseNumber: createOrderPhaseDto.phaseNumber,
      orderSchedule: os,
    });

    const oi = await this.orderInvoiceRepository.create({
      totalPayment: 0,
      totalAmount: 0,
      quantity: 0,
      unit: 'kg',
      vatAmount: 0,
      taxRate: createOrderPhaseDto.orderInvoice?.taxRate,
      invoiceNumber: createOrderPhaseDto.orderInvoice?.invoiceNumber,
      invoiceUrl: createOrderPhaseDto.orderInvoice?.invoiceUrl,
      orderPhase: op,
    });

    let totalAmount = 0;
    let quantity = 0;

    for (const oidDto of createOrderPhaseDto.orderInvoiceDetails) {
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

    let vatAmount = totalAmount * ((oi.taxRate || 0) / 100);
    // Round to 2 decimal places
    vatAmount = Math.round(vatAmount * 100) / 100;
    const totalPayment = totalAmount + vatAmount;

    oi.vatAmount = vatAmount;
    oi.totalPayment = totalPayment;
    oi.totalAmount = totalAmount;
    oi.quantity = quantity;

    await this.orderInvoiceRepository.update(oi.id, oi);

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
            updateOrderPhaseDto.orderInvoice.invoiceNumber ?? oi.invoiceNumber,
          invoiceUrl:
            updateOrderPhaseDto.orderInvoice.invoiceUrl ?? oi.invoiceUrl,
        });
      } else {
        // Only update invoice metadata without details
        await this.orderInvoiceRepository.update(oi.id, {
          taxRate: updateOrderPhaseDto.orderInvoice.taxRate ?? oi.taxRate,
          invoiceNumber:
            updateOrderPhaseDto.orderInvoice.invoiceNumber ?? oi.invoiceNumber,
          invoiceUrl:
            updateOrderPhaseDto.orderInvoice.invoiceUrl ?? oi.invoiceUrl,
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
}
