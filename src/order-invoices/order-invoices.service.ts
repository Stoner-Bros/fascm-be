import {
  // common
  Injectable,
} from '@nestjs/common';
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
}
