import { HarvestSchedule } from '../harvest-schedules/domain/harvest-schedule';
import { HarvestSchedulesService } from '../harvest-schedules/harvest-schedules.service';
import { HarvestScheduleValidationService } from '../harvest-schedules/validators/harvest-schedule-validation.service';

import {
  BadRequestException,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { FilesCloudinaryService } from 'src/files/infrastructure/uploader/cloudinary/files.service';
import { HarvestInvoiceDetailRepository } from 'src/harvest-invoice-details/infrastructure/persistence/harvest-invoice-detail.repository';
import { HarvestInvoiceRepository } from 'src/harvest-invoices/infrastructure/persistence/harvest-invoice.repository';
import { ImageProofsService } from 'src/image-proofs/image-proofs.service';
import { InboundBatchesService } from 'src/inbound-batches/inbound-batches.service';
import { ProductsService } from 'src/products/products.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestPhase } from './domain/harvest-phase';
import {
  CreateHarvestPhaseDto,
  CreateMultipleHarvestPhaseDto,
} from './dto/create-harvest-phase.dto';
import { UpdateHarvestPhaseDto } from './dto/update-harvest-phase.dto';
import { HarvestPhaseStatusEnum } from './enum/harvest-phase-status.enum';
import { HarvestPhaseRepository } from './infrastructure/persistence/harvest-phase.repository';

@Injectable()
export class HarvestPhasesService {
  constructor(
    @Inject(forwardRef(() => ImageProofsService))
    private readonly imageProofService: ImageProofsService,

    private readonly filesCloudinaryService: FilesCloudinaryService,
    private readonly productService: ProductsService,
    @Inject(forwardRef(() => HarvestSchedulesService))
    private readonly harvestScheduleService: HarvestSchedulesService,

    @Inject(forwardRef(() => HarvestScheduleValidationService))
    private readonly harvestScheduleValidationService: HarvestScheduleValidationService,

    private readonly harvestInvoiceRepository: HarvestInvoiceRepository,

    private readonly harvestInvoiceDetailRepository: HarvestInvoiceDetailRepository,

    @Inject(forwardRef(() => InboundBatchesService))
    private readonly inboundBatchesService: InboundBatchesService,

    // Dependencies here
    private readonly harvestPhaseRepository: HarvestPhaseRepository,
  ) {}

  async create(createHarvestPhaseDto: CreateHarvestPhaseDto) {
    // Do not remove comment below.
    // <creating-property />

    const hs = await this.harvestScheduleService.findById(
      createHarvestPhaseDto.harvestSchedule.id,
    );
    if (!hs) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          harvestSchedule: 'notExists',
        },
      });
    }

    // Validate that adding this phase won't exceed schedule limits
    const invoiceDetailsForValidation =
      createHarvestPhaseDto.harvestInvoiceDetails.map((hidDto) => ({
        productId: hidDto.product.id,
        quantity: hidDto.quantity || 0,
      }));

    await this.harvestScheduleValidationService.validatePhaseAddition(
      createHarvestPhaseDto.harvestSchedule.id,
      invoiceDetailsForValidation,
    );

    const hp = await this.harvestPhaseRepository.create({
      description: createHarvestPhaseDto.description,
      phaseNumber: createHarvestPhaseDto.phaseNumber,
      harvestSchedule: hs,
    });

    const hi = await this.harvestInvoiceRepository.create({
      totalPayment: 0,
      totalAmount: 0,
      quantity: 0,
      unit: 'kg',
      vatAmount: 0,
      taxRate: createHarvestPhaseDto.harvestInvoice?.taxRate,
      invoiceNumber: createHarvestPhaseDto.harvestInvoice?.invoiceNumber,
      invoiceUrl: createHarvestPhaseDto.harvestInvoice?.invoiceUrl,
      harvestPhase: hp,
    });

    let totalAmount = 0;
    let quantity = 0;

    for (const hidDto of createHarvestPhaseDto.harvestInvoiceDetails) {
      const product = await this.productService.findById(hidDto.product.id);
      if (!product) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      const hid = await this.harvestInvoiceDetailRepository.create({
        taxRate: 0,
        amount: (hidDto.unitPrice || 0) * (hidDto.quantity || 0),
        unitPrice: hidDto.unitPrice,
        quantity: hidDto.quantity,
        unit: hidDto.unit,
        harvestInvoice: hi,
        product: product,
      });
      totalAmount += hid.amount || 0;
      quantity += hid.quantity || 0;
    }

    let vatAmount = totalAmount * ((hi.taxRate || 0) / 100);
    // Round to 2 decimal places
    vatAmount = Math.round(vatAmount * 100) / 100;
    const totalPayment = totalAmount + vatAmount;

    hi.vatAmount = vatAmount;
    hi.totalPayment = totalPayment;
    hi.totalAmount = totalAmount;
    hi.quantity = quantity;

    await this.harvestInvoiceRepository.update(hi.id, hi);

    return hp;
  }

  async createMultiple(
    createMultipleHarvestPhaseDto: CreateMultipleHarvestPhaseDto,
  ) {
    const results: any[] = [];
    for (const phaseDto of createMultipleHarvestPhaseDto.harvestPhases) {
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
    return this.harvestPhaseRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllByScheduleWithPagination({
    harvestScheduleId,
    paginationOptions,
  }: {
    harvestScheduleId: string;
    paginationOptions: IPaginationOptions;
  }) {
    return this.harvestPhaseRepository.findAllByScheduleWithPagination({
      scheduleId: harvestScheduleId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: HarvestPhase['id']) {
    return this.harvestPhaseRepository.findFullById(id);
  }

  findByIds(ids: HarvestPhase['id'][]) {
    return this.harvestPhaseRepository.findByIds(ids);
  }

  async update(
    id: HarvestPhase['id'],

    updateHarvestPhaseDto: UpdateHarvestPhaseDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let harvestPhase: any = await this.harvestPhaseRepository.findFullById(id);
    if (!harvestPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }
    const harvestScheduleFromHarvestPhase =
      await this.harvestPhaseRepository.findById(id);

    harvestPhase = {
      ...harvestPhase,
      harvestSchedule: harvestScheduleFromHarvestPhase?.harvestSchedule,
    };

    let harvestSchedule: HarvestSchedule | null | undefined = undefined;

    if (updateHarvestPhaseDto.harvestSchedule) {
      const harvestScheduleObject = await this.harvestScheduleService.findById(
        updateHarvestPhaseDto.harvestSchedule.id,
      );
      if (!harvestScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestSchedule: 'notExists',
          },
        });
      }
      harvestSchedule = harvestScheduleObject;
    } else if (updateHarvestPhaseDto.harvestSchedule === null) {
      harvestSchedule = null;
    }

    // Update harvest invoice if provided
    if (updateHarvestPhaseDto.harvestInvoice && harvestPhase.harvestInvoice) {
      const hi = harvestPhase.harvestInvoice;
      const oldHarvestInvoiceDetails =
        await this.harvestInvoiceDetailRepository.findByHarvestInvoiceId(hi.id);

      // Remove old harvest invoice details
      if (oldHarvestInvoiceDetails) {
        for (const oldHid of oldHarvestInvoiceDetails) {
          await this.harvestInvoiceDetailRepository.remove(oldHid.id);
        }
      }
      // Update harvest invoice details if provided
      if (
        updateHarvestPhaseDto.harvestInvoiceDetails &&
        updateHarvestPhaseDto.harvestInvoiceDetails.length > 0
      ) {
        // Validate that updating this phase won't exceed schedule limits
        if (harvestPhase.harvestSchedule?.id) {
          const invoiceDetailsForValidation =
            updateHarvestPhaseDto.harvestInvoiceDetails.map((hidDto) => ({
              productId: hidDto.product.id,
              quantity: hidDto.quantity || 0,
            }));

          await this.harvestScheduleValidationService.validatePhaseAddition(
            harvestPhase.harvestSchedule.id,
            invoiceDetailsForValidation,
            id, // exclude current phase from validation
          );
        }

        let totalAmount = 0;
        let quantity = 0;

        // Create new harvest invoice details
        for (const hidDto of updateHarvestPhaseDto.harvestInvoiceDetails) {
          const product = await this.productService.findById(hidDto.product.id);
          if (!product) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                product: 'notExists',
              },
            });
          }
          const hid = await this.harvestInvoiceDetailRepository.create({
            taxRate: 0,
            amount: (hidDto.unitPrice || 0) * (hidDto.quantity || 0),
            unitPrice: hidDto.unitPrice,
            quantity: hidDto.quantity,
            unit: hidDto.unit,
            harvestInvoice: hi,
            product: product,
          });
          totalAmount += hid.amount || 0;
          quantity += hid.quantity || 0;
        }

        // Calculate VAT and total payment
        const taxRate =
          updateHarvestPhaseDto.harvestInvoice.taxRate ?? hi.taxRate ?? 0;
        let vatAmount = totalAmount * (taxRate / 100);
        // Round to 2 decimal places
        vatAmount = Math.round(vatAmount * 100) / 100;
        const totalPayment = totalAmount + vatAmount;

        // Update harvest invoice
        await this.harvestInvoiceRepository.update(hi.id, {
          totalPayment: totalPayment,
          totalAmount: totalAmount,
          quantity: quantity,
          vatAmount: vatAmount,
          taxRate: taxRate,
          invoiceNumber:
            updateHarvestPhaseDto.harvestInvoice.invoiceNumber ??
            hi.invoiceNumber,
          invoiceUrl:
            updateHarvestPhaseDto.harvestInvoice.invoiceUrl ?? hi.invoiceUrl,
        });
      } else {
        // Only update invoice metadata without details
        await this.harvestInvoiceRepository.update(hi.id, {
          taxRate: updateHarvestPhaseDto.harvestInvoice.taxRate ?? hi.taxRate,
          invoiceNumber:
            updateHarvestPhaseDto.harvestInvoice.invoiceNumber ??
            hi.invoiceNumber,
          invoiceUrl:
            updateHarvestPhaseDto.harvestInvoice.invoiceUrl ?? hi.invoiceUrl,
        });
      }
    }

    return this.harvestPhaseRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateHarvestPhaseDto.description,

      // status: updateHarvestPhaseDto.status,

      phaseNumber: updateHarvestPhaseDto.phaseNumber,

      harvestSchedule,
    });
  }

  remove(id: HarvestPhase['id']) {
    return this.harvestPhaseRepository.remove(id);
  }

  //upload img proof for harvest schedule
  async uploadImgProof(
    id: HarvestPhase['id'],
    file: Express.Multer.File,
  ): Promise<{ path: string }> {
    const harvestPhase = await this.harvestPhaseRepository.findById(id);
    if (!harvestPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'notExists' },
      });
    }
    const uploadedFile = await this.filesCloudinaryService.uploadFile(file);
    await this.imageProofService.create({
      harvestPhase: harvestPhase,
      photo: uploadedFile,
    });
    return { path: uploadedFile.path };
  }

  async updateStatus(id: HarvestPhase['id'], status: HarvestPhase['status']) {
    const harvestPhase = await this.harvestPhaseRepository.findById(id);
    if (!harvestPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = harvestPhase.status;

    // Define allowed status transitions
    const allowedTransitions: Record<string, HarvestPhaseStatusEnum[]> = {
      preparing: [
        HarvestPhaseStatusEnum.DELIVERING,
        HarvestPhaseStatusEnum.CANCELED,
      ],
      delivering: [
        HarvestPhaseStatusEnum.DELIVERED,
        HarvestPhaseStatusEnum.CANCELED,
      ],
      delivered: [
        HarvestPhaseStatusEnum.COMPLETED,
        HarvestPhaseStatusEnum.CANCELED,
      ],
      completed: [],
    };

    // Validate status transition
    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as HarvestPhaseStatusEnum,
      )
    ) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          status: `invalidTransitionFrom${currentStatus}To${status}`,
        },
      });
    }

    if (status === HarvestPhaseStatusEnum.COMPLETED) {
      await this.createInboundBatchForHarvestPhase(id);
    }

    return this.harvestPhaseRepository.update(id, {
      status,
      updatedAt: new Date(),
    });
  }

  async createInboundBatchForHarvestPhase(id: HarvestPhase['id']) {
    const harvestPhase = await this.harvestPhaseRepository.findById(id);
    if (!harvestPhase?.harvestSchedule) {
      return;
    }

    const invoice =
      await this.harvestInvoiceRepository.findByHarvestPhaseId(id);
    if (invoice) {
      const details =
        await this.harvestInvoiceDetailRepository.findByHarvestInvoiceId(
          invoice.id,
        );
      if (Array.isArray(details) && details.length > 0) {
        const harvestSchedule = harvestPhase.harvestSchedule;
        const harvestDate = harvestSchedule.harvestDate;
        const supplier = harvestSchedule.supplier;

        // Format: BATCH_SUPPLIERCODE_YYYYMMDD_INDEX
        // Example: BATCH_SUP001_20231209_001
        const dateStr = harvestDate
          ? new Date(harvestDate).toISOString().split('T')[0].replace(/-/g, '')
          : new Date().toISOString().split('T')[0].replace(/-/g, '');
        const supplierCode = supplier?.id || 'UNKNOWN';

        for (let i = 0; i < details.length; i++) {
          const d = details[i];
          const batchIndex = String(i + 1).padStart(3, '0');
          const batchCode = `BATCH_${supplierCode}_${dateStr}_${batchIndex}`;

          await this.inboundBatchesService.create({
            quantity: d.quantity ?? undefined,
            unit: d.unit ?? undefined,
            batchCode: batchCode,
            harvestInvoiceDetail: d.id ? { id: d.id } : undefined,
          });
        }
      }
    }
  }
}
