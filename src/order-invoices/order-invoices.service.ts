import { PaymentsService } from '../payments/payments.service';
import { Payment } from '../payments/domain/payment';

import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OrderPhase } from 'src/order-phases/domain/order-phase';
import { OrderPhasesService } from 'src/order-phases/order-phases.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderInvoice } from './domain/order-invoice';
import { CreateOrderInvoiceDto } from './dto/create-order-invoice.dto';
import { OrderInvoiceRepository } from './infrastructure/persistence/order-invoice.repository';
import { UpdateOrderInvoiceDto } from './dto/update-order-invoice.dto';

@Injectable()
export class OrderInvoicesService {
  constructor(
    private readonly paymentService: PaymentsService,

    // Dependencies here
    private readonly orderInvoiceRepository: OrderInvoiceRepository,
    private readonly orderPhaseService: OrderPhasesService,
  ) {}

  async create(createOrderInvoiceDto: CreateOrderInvoiceDto) {
    // Do not remove comment below.
    // <creating-property />
    let payment: Payment | null | undefined = undefined;

    if (createOrderInvoiceDto.payment) {
      const paymentObject = await this.paymentService.findById(
        createOrderInvoiceDto.payment.id,
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
    } else if (createOrderInvoiceDto.payment === null) {
      payment = null;
    }

    let orderPhase: OrderPhase | null | undefined = undefined;

    if (createOrderInvoiceDto.orderPhase) {
      const orderPhaseObject = await this.orderPhaseService.findById(
        createOrderInvoiceDto.orderPhase.id,
      );
      if (!orderPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderPhase: 'notExists',
          },
        });
      }
      orderPhase = orderPhaseObject;
    } else if (createOrderInvoiceDto.orderPhase === null) {
      orderPhase = null;
    }

    return this.orderInvoiceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      payment,

      totalPayment: createOrderInvoiceDto.totalPayment,

      totalAmount: createOrderInvoiceDto.totalAmount,

      quantity: createOrderInvoiceDto.quantity,

      unit: createOrderInvoiceDto.unit,
      vatAmount: createOrderInvoiceDto.vatAmount,

      taxRate: createOrderInvoiceDto.taxRate,

      invoiceNumber: createOrderInvoiceDto.invoiceNumber,

      invoiceUrl: createOrderInvoiceDto.invoiceUrl,
      orderPhase,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderInvoiceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderInvoice['id']) {
    return this.orderInvoiceRepository.findById(id);
  }

  findByIds(ids: OrderInvoice['id'][]) {
    return this.orderInvoiceRepository.findByIds(ids);
  }

  async update(
    id: OrderInvoice['id'],

    updateOrderInvoiceDto: UpdateOrderInvoiceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let payment: Payment | null | undefined = undefined;

    if (updateOrderInvoiceDto.payment) {
      const paymentObject = await this.paymentService.findById(
        updateOrderInvoiceDto.payment.id,
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
    } else if (updateOrderInvoiceDto.payment === null) {
      payment = null;
    }

    let orderPhase: OrderPhase | null | undefined = undefined;

    if (updateOrderInvoiceDto.orderPhase) {
      const orderPhaseObject = await this.orderPhaseService.findById(
        updateOrderInvoiceDto.orderPhase.id,
      );
      if (!orderPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderPhase: 'notExists',
          },
        });
      }
      orderPhase = orderPhaseObject;
    } else if (updateOrderInvoiceDto.orderPhase === null) {
      orderPhase = null;
    }

    return this.orderInvoiceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      payment,

      totalPayment: updateOrderInvoiceDto.totalPayment,

      totalAmount: updateOrderInvoiceDto.totalAmount,

      quantity: updateOrderInvoiceDto.quantity,

      unit: updateOrderInvoiceDto.unit,
      vatAmount: updateOrderInvoiceDto.vatAmount,

      taxRate: updateOrderInvoiceDto.taxRate,

      invoiceNumber: updateOrderInvoiceDto.invoiceNumber,

      invoiceUrl: updateOrderInvoiceDto.invoiceUrl,
      orderPhase,
    });
  }

  remove(id: OrderInvoice['id']) {
    return this.orderInvoiceRepository.remove(id);
  }
}
