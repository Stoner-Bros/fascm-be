import {
  // common
  Injectable,
} from '@nestjs/common';
import { OrderInvoice } from './domain/order-invoice';
import { OrderInvoiceRepository } from './infrastructure/persistence/order-invoice.repository';
import { DeepPartial } from '../utils/types/deep-partial.type';

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
}
