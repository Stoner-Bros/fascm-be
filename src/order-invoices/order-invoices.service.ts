import {
  // common
  Injectable,
} from '@nestjs/common';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { OrderInvoice } from './domain/order-invoice';
import { OrderInvoiceRepository } from './infrastructure/persistence/order-invoice.repository';

@Injectable()
export class OrderInvoicesService {
  constructor(
    // Dependencies here
    private readonly orderInvoiceRepository: OrderInvoiceRepository,
  ) {}

  findById(id: OrderInvoice['id']) {
    return this.orderInvoiceRepository.findById(id);
  }

  findByIds(ids: OrderInvoice['id'][]) {
    return this.orderInvoiceRepository.findByIds(ids);
  }

  update(id: OrderInvoice['id'], payload: DeepPartial<OrderInvoice>) {
    return this.orderInvoiceRepository.update(id, payload);
  }

  async recalculateAmount(id: OrderInvoice['id']) {
    const orderInvoice = await this.orderInvoiceRepository.findById(id);
    if (!orderInvoice) {
      return;
    }
    orderInvoice.vatAmount =
      ((orderInvoice.totalAmount ?? 0) * (orderInvoice.taxRate ?? 0)) / 100;
    orderInvoice.totalPayment =
      orderInvoice.totalAmount! + orderInvoice.vatAmount!;
    await this.orderInvoiceRepository.update(id, orderInvoice);
  }
}
