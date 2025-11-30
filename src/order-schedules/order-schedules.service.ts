import { ConsigneesService } from '../consignees/consignees.service';
import { Consignee } from '../consignees/domain/consignee';

import {
  BadRequestException,
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NotificationsGateway } from '../notifications/notifications.gateway';
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

    // Dependencies here
    private readonly orderScheduleRepository: OrderScheduleRepository,
    private readonly notificationsGateway: NotificationsGateway,
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
      address: createOrderScheduleDto.address,

      description: createOrderScheduleDto.description,

      status: OrderScheduleStatusEnum.PENDING,

      consignee,
    });
  }

  findAllWithPagination({
    paginationOptions,
    filters,
    sort,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: {
      status?: OrderSchedule['status'];
    };
    sort?: 'ASC' | 'DESC';
  }) {
    return this.orderScheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
      sort,
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
      address: updateOrderScheduleDto.address,

      description: updateOrderScheduleDto.description,

      status: OrderScheduleStatusEnum.PENDING,

      consignee,
    });
  }

  async approveNotification(id: OrderSchedule['id']) {
    const schedule = await this.orderScheduleRepository.findById(id);
    if (!schedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'notExists' },
      });
    }
    const updated = await this.orderScheduleRepository.update(id, {
      status: OrderScheduleStatusEnum.APPROVED,
    });
    const consigneeId = updated?.consignee?.id;
    if (consigneeId) {
      this.notificationsGateway.notifyConsignee(consigneeId, {
        type: 'order-approved',
        title: 'Đơn hàng đã được duyệt',
        message: `Đơn hàng ${updated.id} đã được duyệt`,
        data: { orderScheduleId: updated.id },
        timestamp: new Date().toISOString(),
      });
    }
    return updated;
  }

  remove(id: OrderSchedule['id']) {
    return this.orderScheduleRepository.remove(id);
  }

  async updateStatus(
    id: OrderSchedule['id'],
    status: OrderSchedule['status'],
    reason?: string,
  ) {
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
        OrderScheduleStatusEnum.APPROVED,
        OrderScheduleStatusEnum.REJECTED,
        OrderScheduleStatusEnum.CANCELED,
      ],
      rejected: [],
      canceled: [],
      approved: [
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

    // Validate that reason is provided when rejecting
    if (status === OrderScheduleStatusEnum.REJECTED && !reason) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          reason: 'reasonRequiredForRejection',
        },
      });
    }

    if (status === OrderScheduleStatusEnum.APPROVED) {
      await this.approveNotification(id);
    }

    // Send notification for rejection
    if (status === OrderScheduleStatusEnum.REJECTED) {
      const consigneeId = orderSchedule?.consignee?.id;
      if (consigneeId) {
        this.notificationsGateway.notifyConsignee(consigneeId, {
          type: 'order-rejected',
          title: 'Đơn hàng đã bị từ chối',
          message: `Đơn hàng ${orderSchedule.id} đã bị từ chối. Lý do: ${reason}`,
          data: { orderScheduleId: orderSchedule.id, reason },
          timestamp: new Date().toISOString(),
        });
      }
    }

    return this.orderScheduleRepository.update(id, {
      status,
      reason: status === OrderScheduleStatusEnum.REJECTED ? reason : null,
    });
  }
}
