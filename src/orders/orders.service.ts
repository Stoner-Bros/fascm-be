import { PaymentsService } from '../payments/payments.service';
import { Payment } from '../payments/domain/payment';

import { OrderSchedulesService } from '../order-schedules/order-schedules.service';
import { OrderSchedule } from '../order-schedules/domain/order-schedule';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';

@Injectable()
export class OrdersService {
  constructor(
    private readonly paymentService: PaymentsService,

    @Inject(forwardRef(() => OrderSchedulesService))
    private readonly orderScheduleService: OrderSchedulesService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Do not remove comment below.
    // <creating-property />

    let payment: Payment | null | undefined = undefined;

    if (createOrderDto.payment) {
      const paymentObject = await this.paymentService.findById(
        createOrderDto.payment.id,
      );
      if (!paymentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            payment: 'notExists',
          },
        });
      }
      payment = paymentObject;
    } else if (createOrderDto.payment === null) {
      payment = null;
    }

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
      totalVolume: createOrderDto.totalVolume,

      totalMass: createOrderDto.totalMass,

      totalPayment: createOrderDto.totalPayment,

      vatAmount: createOrderDto.vatAmount,

      totalAmount: createOrderDto.totalAmount,

      taxRate: createOrderDto.taxRate,

      orderDate: createOrderDto.orderDate,

      orderUrl: createOrderDto.orderUrl,

      payment,

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

    let payment: Payment | null | undefined = undefined;

    if (updateOrderDto.payment) {
      const paymentObject = await this.paymentService.findById(
        updateOrderDto.payment.id,
      );
      if (!paymentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            payment: 'notExists',
          },
        });
      }
      payment = paymentObject;
    } else if (updateOrderDto.payment === null) {
      payment = null;
    }

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
      totalVolume: updateOrderDto.totalVolume,

      totalMass: updateOrderDto.totalMass,

      totalPayment: updateOrderDto.totalPayment,

      vatAmount: updateOrderDto.vatAmount,

      totalAmount: updateOrderDto.totalAmount,

      taxRate: updateOrderDto.taxRate,

      orderDate: updateOrderDto.orderDate,

      orderUrl: updateOrderDto.orderUrl,

      payment,

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
