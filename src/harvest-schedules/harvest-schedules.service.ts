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
import { DeliveriesService } from '../deliveries/deliveries.service';
import { DeliveryStatusEnum } from '../deliveries/enum/delivery-status.enum';
import { HarvestDetailRepository } from 'src/harvest-details/infrastructure/persistence/harvest-detail.repository';
import { HarvestTicketRepository } from 'src/harvest-tickets/infrastructure/persistence/harvest-ticket.repository';
import { InboundBatchesService } from 'src/inbound-batches/inbound-batches.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestSchedule } from './domain/harvest-schedule';
import { CreateHarvestScheduleDto } from './dto/create-harvest-schedule.dto';
import { UpdateHarvestScheduleDto } from './dto/update-harvest-schedule.dto';
import { HarvestScheduleStatusEnum } from './enum/harvest-schedule-status.enum';
import { HarvestScheduleRepository } from './infrastructure/persistence/harvest-schedule.repository';

@Injectable()
export class HarvestSchedulesService {
  constructor(
    private readonly supplierService: SuppliersService,

    @Inject(forwardRef(() => DeliveriesService))
    private readonly deliveriesService: DeliveriesService,

    // Dependencies here
    private readonly harvestScheduleRepository: HarvestScheduleRepository,
    @Inject(forwardRef(() => HarvestTicketRepository))
    private readonly harvestTicketRepository: HarvestTicketRepository,
    @Inject(forwardRef(() => HarvestDetailRepository))
    private readonly harvestDetailRepository: HarvestDetailRepository,
    private readonly inboundBatchService: InboundBatchesService,
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
      description: updateHarvestScheduleDto.description,

      status: HarvestScheduleStatusEnum.PENDING,

      harvestDate: updateHarvestScheduleDto.harvestDate,

      supplierId,
    });
  }

  remove(id: HarvestSchedule['id']) {
    return this.harvestScheduleRepository.remove(id);
  }

  async updateStatus(
    id: HarvestSchedule['id'],
    status: HarvestSchedule['status'],
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
        HarvestScheduleStatusEnum.PREPARING,
        HarvestScheduleStatusEnum.REJECTED,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      rejected: [],
      canceled: [],
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

    // Handle status-specific actions
    switch (status) {
      case HarvestScheduleStatusEnum.REJECTED:
      case HarvestScheduleStatusEnum.CANCELED:
        // Cancel delivery if exists
        await this.cancelHarvestDeliveryIfExists(id);
        break;

      case HarvestScheduleStatusEnum.PREPARING:
        // Create or update delivery to scheduled
        await this.prepareHarvestDeliveryIfExists(id);
        break;

      case HarvestScheduleStatusEnum.DELIVERING:
        // Update delivery to delivering
        await this.deliverHarvestDelivery(id);
        break;

      case HarvestScheduleStatusEnum.DELIVERED:
        // Update delivery to completed
        await this.deliverDelivery(id);
        break;
    }

    return this.harvestScheduleRepository.update(id, {
      status,
    });
  }

  /**
   * Cancel delivery if it exists (for rejected/canceled harvests)
   */
  private async cancelHarvestDeliveryIfExists(
    harvestScheduleId: HarvestSchedule['id'],
  ) {
    const delivery =
      await this.deliveriesService.findByHarvestScheduleId(harvestScheduleId);

    // If no delivery exists, it's okay (harvest might be rejected before delivery creation)
    if (!delivery) {
      return;
    }

    // Only cancel if not already completed or cancelled
    if (
      delivery.status !== DeliveryStatusEnum.COMPLETED &&
      delivery.status !== DeliveryStatusEnum.CANCELLED
    ) {
      await this.deliveriesService.updateStatus(
        delivery.id,
        DeliveryStatusEnum.CANCELLED,
      );
    }
  }

  /**
   * Prepare delivery - create or update to scheduled status
   */
  private async prepareHarvestDeliveryIfExists(
    harvestScheduleId: HarvestSchedule['id'],
  ) {
    const delivery =
      await this.deliveriesService.findByHarvestScheduleId(harvestScheduleId);

    // If no delivery exists, it's okay (delivery will be created separately)
    if (!delivery) {
      return;
    }

    await this.deliveriesService.updateStatus(
      delivery.id,
      DeliveryStatusEnum.SCHEDULED,
    );
  }

  /**
   * Update delivery to delivering status
   */
  private async deliverHarvestDelivery(
    harvestScheduleId: HarvestSchedule['id'],
  ) {
    const delivery =
      await this.deliveriesService.findByHarvestScheduleId(harvestScheduleId);

    if (!delivery) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          delivery: 'deliveryNotFoundForHarvest',
        },
      });
    }

    await this.deliveriesService.updateStatus(
      delivery.id,
      DeliveryStatusEnum.DELIVERING,
    );
  }

  /**
   * Mark delivery as delivered
   */
  private async deliverDelivery(harvestScheduleId: HarvestSchedule['id']) {
    const delivery =
      await this.deliveriesService.findByHarvestScheduleId(harvestScheduleId);

    if (!delivery) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          delivery: 'deliveryNotFoundForHarvest',
        },
      });
    }

    await this.deliveriesService.updateStatus(
      delivery.id,
      DeliveryStatusEnum.COMPLETED,
    );
  }
}
