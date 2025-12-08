import {
  // common
  Injectable,
} from '@nestjs/common';
import { OrderInvoiceDetail } from './domain/order-invoice-detail';
import { OrderInvoiceDetailRepository } from './infrastructure/persistence/order-invoice-detail.repository';

@Injectable()
export class OrderInvoiceDetailsService {
  constructor(
    private readonly orderInvoiceDetailRepository: OrderInvoiceDetailRepository,
  ) {}
  findById(id: OrderInvoiceDetail['id']) {
    return this.orderInvoiceDetailRepository.findById(id);
  }

  findByIds(ids: OrderInvoiceDetail['id'][]) {
    return this.orderInvoiceDetailRepository.findByIds(ids);
  }
}
