import { ConsigneesService } from '../consignees/consignees.service';
import { Consignee } from '../consignees/domain/consignee';

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
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderSchedule } from './domain/order-schedule';
import { CreateOrderScheduleDto } from './dto/create-order-schedule.dto';
import { UpdateOrderScheduleDto } from './dto/update-order-schedule.dto';
import { OrderScheduleStatusEnum } from './enum/order-schedule-status.enum';
import { OrderScheduleRepository } from './infrastructure/persistence/order-schedule.repository';

@Injectable()
export class OrderSchedulesService {
  constructor(
    private readonly consigneeService: ConsigneesService,

    @Inject(forwardRef(() => DeliveriesService))
    private readonly deliveriesService: DeliveriesService,

    // Dependencies here
    private readonly orderScheduleRepository: OrderScheduleRepository,
  ) {}

  async create(createOrderScheduleDto: CreateOrderScheduleDto) {
    // Do not remove comment below.
    // <creating-property />

    let consignee: Consignee | null | undefined = undefined;

    if (createOrderScheduleDto.consignee) {
      const consigneeObject = await this.consigneeService.findById(
        createOrderScheduleDto.consignee.id,
      );
      if (!consigneeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            consignee: 'notExists',
          },
        });
      }
      consignee = consigneeObject;
    } else if (createOrderScheduleDto.consignee === null) {
      consignee = null;
    }

    return this.orderScheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createOrderScheduleDto.description,

      status: OrderScheduleStatusEnum.PENDING,

      consignee,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderScheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderSchedule['id']) {
    return this.orderScheduleRepository.findById(id);
  }

  findByIds(ids: OrderSchedule['id'][]) {
    return this.orderScheduleRepository.findByIds(ids);
  }

  async update(
    id: OrderSchedule['id'],

    updateOrderScheduleDto: UpdateOrderScheduleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let consignee: Consignee | null | undefined = undefined;

    if (updateOrderScheduleDto.consignee) {
      const consigneeObject = await this.consigneeService.findById(
        updateOrderScheduleDto.consignee.id,
      );
      if (!consigneeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            consignee: 'notExists',
          },
        });
      }
      consignee = consigneeObject;
    } else if (updateOrderScheduleDto.consignee === null) {
      consignee = null;
    }

    return this.orderScheduleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateOrderScheduleDto.description,

      status: OrderScheduleStatusEnum.PENDING,

      consignee,
    });
  }

  remove(id: OrderSchedule['id']) {
    return this.orderScheduleRepository.remove(id);
  }

  async updateStatus(id: OrderSchedule['id'], status: OrderSchedule['status']) {
    const orderSchedule = await this.orderScheduleRepository.findById(id);

    if (!orderSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = orderSchedule.status;

    // Define allowed status transitions
    const allowedTransitions: Record<string, OrderScheduleStatusEnum[]> = {
      pending: [
        OrderScheduleStatusEnum.PREPARING,
        OrderScheduleStatusEnum.REJECTED,
        OrderScheduleStatusEnum.CANCELED,
      ],
      rejected: [],
      canceled: [],
      preparing: [
        OrderScheduleStatusEnum.DELIVERING,
        OrderScheduleStatusEnum.CANCELED,
      ],
      delivering: [
        OrderScheduleStatusEnum.DELIVERED,
        OrderScheduleStatusEnum.CANCELED,
      ],
      delivered: [
        OrderScheduleStatusEnum.COMPLETED,
        OrderScheduleStatusEnum.CANCELED,
      ],
      completed: [],
    };

    // Validate status transition
    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as OrderScheduleStatusEnum,
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
      case OrderScheduleStatusEnum.REJECTED:
      case OrderScheduleStatusEnum.CANCELED:
        // Cancel delivery if exists
        await this.cancelOrderDeliveryIfExists(id);
        break;

      case OrderScheduleStatusEnum.PREPARING:
        // Create or update delivery to scheduled
        await this.prepareOrderDeliveryIfExists(id);
        break;

      case OrderScheduleStatusEnum.DELIVERING:
        // Update delivery to delivering
        await this.deliverOrderDelivery(id);
        break;

      case OrderScheduleStatusEnum.DELIVERED:
        // Update delivery to completed
        await this.deliverDelivery(id);
        break;
    }

    return this.orderScheduleRepository.update(id, {
      status,
    });
  }

  /**
   * Cancel delivery if it exists (for rejected/canceled orders)
   */
  private async cancelOrderDeliveryIfExists(
    orderScheduleId: OrderSchedule['id'],
  ) {
    const delivery =
      await this.deliveriesService.findByOrderScheduleId(orderScheduleId);

    // If no delivery exists, it's okay (order might be rejected before delivery creation)
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
  private async prepareOrderDeliveryIfExists(
    orderScheduleId: OrderSchedule['id'],
  ) {
    const delivery =
      await this.deliveriesService.findByOrderScheduleId(orderScheduleId);

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
  private async deliverOrderDelivery(orderScheduleId: OrderSchedule['id']) {
    const delivery =
      await this.deliveriesService.findByOrderScheduleId(orderScheduleId);

    if (!delivery) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          delivery: 'deliveryNotFoundForOrder',
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
  private async deliverDelivery(orderScheduleId: OrderSchedule['id']) {
    const delivery =
      await this.deliveriesService.findByOrderScheduleId(orderScheduleId);

    if (!delivery) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          delivery: 'deliveryNotFoundForOrder',
        },
      });
    }

    await this.deliveriesService.updateStatus(
      delivery.id,
      DeliveryStatusEnum.COMPLETED,
    );
  }
}
