import { HarvestSchedule } from '../harvest-schedules/domain/harvest-schedule';
import { HarvestSchedulesService } from '../harvest-schedules/harvest-schedules.service';

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
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestPhase } from './domain/harvest-phase';
import { CreateHarvestPhaseDto } from './dto/create-harvest-phase.dto';
import { UpdateHarvestPhaseDto } from './dto/update-harvest-phase.dto';
import { HarvestPhaseStatusEnum } from './enum/harvest-phase-status.enum';
import { HarvestPhaseRepository } from './infrastructure/persistence/harvest-phase.repository';

@Injectable()
export class HarvestPhasesService {
  constructor(
    @Inject(forwardRef(() => ImageProofsService))
    private readonly imageProofService: ImageProofsService,

    private readonly filesCloudinaryService: FilesCloudinaryService,
    @Inject(forwardRef(() => HarvestSchedulesService))
    private readonly harvestScheduleService: HarvestSchedulesService,

    @Inject(forwardRef(() => HarvestInvoiceRepository))
    private readonly harvestInvoiceRepository: HarvestInvoiceRepository,

    @Inject(forwardRef(() => HarvestInvoiceDetailRepository))
    private readonly harvestInvoiceDetailRepository: HarvestInvoiceDetailRepository,

    @Inject(forwardRef(() => InboundBatchesService))
    private readonly inboundBatchesService: InboundBatchesService,

    // Dependencies here
    private readonly harvestPhaseRepository: HarvestPhaseRepository,
  ) {}

  async create(createHarvestPhaseDto: CreateHarvestPhaseDto) {
    // Do not remove comment below.
    // <creating-property />

    let harvestSchedule: HarvestSchedule | null | undefined = undefined;

    if (createHarvestPhaseDto.harvestSchedule) {
      const harvestScheduleObject = await this.harvestScheduleService.findById(
        createHarvestPhaseDto.harvestSchedule.id,
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
    } else if (createHarvestPhaseDto.harvestSchedule === null) {
      harvestSchedule = null;
    }

    return this.harvestPhaseRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createHarvestPhaseDto.description,

      // status: createHarvestPhaseDto.status,

      phaseNumber: createHarvestPhaseDto.phaseNumber,

      harvestSchedule,
    });
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

  findById(id: HarvestPhase['id']) {
    return this.harvestPhaseRepository.findById(id);
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

    // Validate that reason is provided when rejecting
    // if (status === HarvestPhaseStatusEnum.REJECTED && !reason) {
    //   throw new BadRequestException({
    //     status: HttpStatus.BAD_REQUEST,
    //     errors: {
    //       reason: 'reasonRequiredForRejection',
    //     },
    //   });
    // }

    // if (status === HarvestPhaseStatusEnum.APPROVED) {
    //   await this.approveNotification(id);
    // }

    if (status === HarvestPhaseStatusEnum.COMPLETED) {
      await this.createInboundBatchForHarvestPhase(id);
    }

    // Send notification for rejection
    // if (status === HarvestPhaseStatusEnum.REJECTED) {
    //   const supplier = harvestSchedule?.supplier;
    //   if (supplier?.id) {
    //     this.notificationsGateway.notifySupplier(supplier.id, {
    //       type: 'harvest-rejected',
    //       title: 'Lịch thu hoạch đã bị từ chối',
    //       message: `Lịch thu hoạch ${harvestSchedule.id} đã bị từ chối. Lý do: ${reason}`,
    //       data: { harvestScheduleId: harvestSchedule.id, reason },
    //       timestamp: new Date().toISOString(),
    //     });
    //   }
    // }

    return this.harvestPhaseRepository.update(id, {
      status,
      updatedAt: new Date(),
    });
  }

  async createInboundBatchForHarvestPhase(id: HarvestPhase['id']) {
    const invoice =
      await this.harvestInvoiceRepository.findByHarvestPhaseId(id);
    if (invoice) {
      const details =
        await this.harvestInvoiceDetailRepository.findByHarvestInvoiceId(
          invoice.id,
        );
      if (Array.isArray(details) && details.length > 0) {
        for (const d of details) {
          await this.inboundBatchesService.create({
            quantity: d.quantity ?? undefined,
            unit: d.unit ?? undefined,
            harvestInvoiceDetail: d.id ? { id: d.id } : undefined,
          });
        }
      }
    }
  }
}
