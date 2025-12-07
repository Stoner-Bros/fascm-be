import { ImageProofsService } from '../image-proofs/image-proofs.service';

import { Supplier } from '../suppliers/domain/supplier';
import { SuppliersService } from '../suppliers/suppliers.service';

import {
  BadRequestException,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { HarvestDetailRepository } from 'src/harvest-details/infrastructure/persistence/harvest-detail.repository';
import { HarvestTicketRepository } from 'src/harvest-tickets/infrastructure/persistence/harvest-ticket.repository';
import { InboundBatchesService } from 'src/inbound-batches/inbound-batches.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestSchedule } from './domain/harvest-schedule';
import { CreateHarvestScheduleDto } from './dto/create-harvest-schedule.dto';
import { UpdateHarvestScheduleDto } from './dto/update-harvest-schedule.dto';
import { HarvestScheduleStatusEnum } from './enum/harvest-schedule-status.enum';
import { HarvestScheduleRepository } from './infrastructure/persistence/harvest-schedule.repository';
import { FilesCloudinaryService } from 'src/files/infrastructure/uploader/cloudinary/files.service';

@Injectable()
export class HarvestSchedulesService {
  constructor(
    @Inject(forwardRef(() => ImageProofsService))
    private readonly imageProofService: ImageProofsService,

    private readonly filesCloudinaryService: FilesCloudinaryService,

    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly harvestScheduleRepository: HarvestScheduleRepository,
    @Inject(forwardRef(() => HarvestTicketRepository))
    private readonly harvestTicketRepository: HarvestTicketRepository,
    @Inject(forwardRef(() => HarvestDetailRepository))
    private readonly harvestDetailRepository: HarvestDetailRepository,
    private readonly inboundBatchService: InboundBatchesService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async create(createHarvestScheduleDto: CreateHarvestScheduleDto) {
    // Do not remove comment below.
    // <creating-property />

    let supplierId: Supplier | null | undefined = undefined;

    if (createHarvestScheduleDto.supplierId) {
      const supplierIdObject = await this.supplierService.findById(
        createHarvestScheduleDto.supplierId.id,
      );
      if (!supplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierId: 'notExists',
          },
        });
      }
      supplierId = supplierIdObject;
    } else if (createHarvestScheduleDto.supplierId === null) {
      supplierId = null;
    }

    return this.harvestScheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />

      address: createHarvestScheduleDto.address,

      description: createHarvestScheduleDto.description,

      status: HarvestScheduleStatusEnum.PENDING,

      harvestDate: createHarvestScheduleDto.harvestDate,

      supplierId,
    });
  }

  findAllWithPagination({
    paginationOptions,
    filters,
    sort,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { status?: HarvestScheduleStatusEnum };
    sort?: 'ASC' | 'DESC';
  }) {
    return this.harvestScheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
      sort,
    });
  }

  findById(id: HarvestSchedule['id']) {
    return this.harvestScheduleRepository.findById(id);
  }

  findByIds(ids: HarvestSchedule['id'][]) {
    return this.harvestScheduleRepository.findByIds(ids);
  }

  async update(
    id: HarvestSchedule['id'],

    updateHarvestScheduleDto: UpdateHarvestScheduleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let supplierId: Supplier | null | undefined = undefined;

    if (updateHarvestScheduleDto.supplierId) {
      const supplierIdObject = await this.supplierService.findById(
        updateHarvestScheduleDto.supplierId.id,
      );
      if (!supplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierId: 'notExists',
          },
        });
      }
      supplierId = supplierIdObject;
    } else if (updateHarvestScheduleDto.supplierId === null) {
      supplierId = null;
    }

    return this.harvestScheduleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />

      address: updateHarvestScheduleDto.address,

      description: updateHarvestScheduleDto.description,

      status: HarvestScheduleStatusEnum.PENDING,

      supplierId,

      harvestDate: updateHarvestScheduleDto.harvestDate,
    });
  }

  async approveNotification(id: HarvestSchedule['id']) {
    const harvestSchedule = await this.harvestScheduleRepository.findById(id);
    if (!harvestSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'notExists' },
      });
    }
    const supplierId = harvestSchedule?.supplierId?.id;
    if (supplierId) {
      this.notificationsGateway.notifySupplier(supplierId, {
        type: 'harvest-approved',
        title: 'Lịch thu hoạch đã được duyệt',
        message: `Lịch thu hoạch ${harvestSchedule.id} đã được duyệt`,
        data: { harvestScheduleId: harvestSchedule.id },
        timestamp: new Date().toISOString(),
      });
    }
  }

  async createInboundBatchForHarvestSchedule(id: HarvestSchedule['id']) {
    const ticket =
      await this.harvestTicketRepository.findByHarvestScheduleId(id);
    if (ticket) {
      const details = await this.harvestDetailRepository.findByHarvestTicketId(
        ticket.id,
      );
      if (Array.isArray(details) && details.length > 0) {
        for (const d of details) {
          await this.inboundBatchService.create({
            quantity: d.quantity ?? undefined,
            unit: d.unit ?? undefined,
            // product: d.product?.id ? { id: d.product.id } : undefined,
            // harvestDetail: d.id ? { id: d.id } : undefined,
          });
        }
      }
    }
  }

  remove(id: HarvestSchedule['id']) {
    return this.harvestScheduleRepository.remove(id);
  }

  async updateStatus(
    id: HarvestSchedule['id'],
    status: HarvestSchedule['status'],
    reason?: string,
  ) {
    const harvestSchedule = await this.harvestScheduleRepository.findById(id);

    if (!harvestSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = harvestSchedule.status;

    // Define allowed status transitions
    const allowedTransitions: Record<string, HarvestScheduleStatusEnum[]> = {
      pending: [
        HarvestScheduleStatusEnum.APPROVED,
        HarvestScheduleStatusEnum.REJECTED,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      rejected: [],
      canceled: [],
      approved: [
        HarvestScheduleStatusEnum.PREPARING,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      preparing: [
        HarvestScheduleStatusEnum.DELIVERING,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      delivering: [
        HarvestScheduleStatusEnum.DELIVERED,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      delivered: [
        HarvestScheduleStatusEnum.COMPLETED,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      completed: [],
    };

    // Validate status transition
    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as HarvestScheduleStatusEnum,
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
    if (status === HarvestScheduleStatusEnum.REJECTED && !reason) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          reason: 'reasonRequiredForRejection',
        },
      });
    }

    if (status === HarvestScheduleStatusEnum.APPROVED) {
      await this.approveNotification(id);
    }

    if (status === HarvestScheduleStatusEnum.COMPLETED) {
      await this.createInboundBatchForHarvestSchedule(id);
    }

    // Send notification for rejection
    if (status === HarvestScheduleStatusEnum.REJECTED) {
      const supplierId = harvestSchedule?.supplierId?.id;
      if (supplierId) {
        this.notificationsGateway.notifySupplier(supplierId, {
          type: 'harvest-rejected',
          title: 'Lịch thu hoạch đã bị từ chối',
          message: `Lịch thu hoạch ${harvestSchedule.id} đã bị từ chối. Lý do: ${reason}`,
          data: { harvestScheduleId: harvestSchedule.id, reason },
          timestamp: new Date().toISOString(),
        });
      }
    }

    return this.harvestScheduleRepository.update(id, {
      status,
      reason: status === HarvestScheduleStatusEnum.REJECTED ? reason : null,
      updatedAt: new Date(),
    });
  }

  //upload img proof for harvest schedule
  async uploadImgProof(
    id: HarvestSchedule['id'],
    file: Express.Multer.File,
  ): Promise<{ path: string }> {
    const harvestSchedule = await this.harvestScheduleRepository.findById(id);
    if (!harvestSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'notExists' },
      });
    }
    const uploadedFile = await this.filesCloudinaryService.uploadFile(file);
    await this.imageProofService.create({
      harvestSchedule: harvestSchedule,
      photo: uploadedFile,
    });
    return { path: uploadedFile.path };
  }
}
