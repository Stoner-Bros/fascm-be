import { OrderSchedule } from '../order-schedules/domain/order-schedule';
import { OrderSchedulesService } from '../order-schedules/order-schedules.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => OrderSchedulesService))
    private readonly orderScheduleService: OrderSchedulesService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Do not remove comment below.
    // <creating-property />
    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (createOrderDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        createOrderDto.orderSchedule.id,
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
    } else if (createOrderDto.orderSchedule === null) {
      orderSchedule = null;
    }

    return this.orderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      unit: createOrderDto.unit,

      quantity: createOrderDto.quantity,
      orderNumber: createOrderDto.orderNumber,

      orderUrl: createOrderDto.orderUrl,

      orderSchedule,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findMineWithPagination({
    paginationOptions,
    userId,
  }: {
    paginationOptions: IPaginationOptions;
    userId: string;
  }) {
    return this.orderRepository.findMyOrdersWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters: { consigneeUserId: userId },
    });
  }

  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }

  async update(
    id: Order['id'],

    updateOrderDto: UpdateOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (updateOrderDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        updateOrderDto.orderSchedule.id,
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
    } else if (updateOrderDto.orderSchedule === null) {
      orderSchedule = null;
    }

    return this.orderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      unit: updateOrderDto.unit,

      quantity: updateOrderDto.quantity,
      orderNumber: updateOrderDto.orderNumber,

      orderUrl: updateOrderDto.orderUrl,
      orderSchedule,
    });
  }

  remove(id: Order['id']) {
    return this.orderRepository.remove(id);
  }

  async findOrderByOSId(id: OrderSchedule['id']) {
    const order = await this.orderRepository.findByOSId(id);
    if (!order) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'notExists' },
      });
    }
    return order;
  }
}
