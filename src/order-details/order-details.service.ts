import {
  // common
  Injectable,
} from '@nestjs/common';
import { Order } from '../orders/domain/order';
import { OrderDetail } from './domain/order-detail';
import { OrderDetailRepository } from './infrastructure/persistence/order-detail.repository';

@Injectable()
export class OrderDetailsService {
  constructor(
    // Dependencies here
    private readonly orderDetailRepository: OrderDetailRepository,
  ) {}
  findById(id: OrderDetail['id']) {
    return this.orderDetailRepository.findById(id);
  }

  findByOrderId(orderId: Order['id']) {
    return this.orderDetailRepository.findByOrderId(orderId);
  }

  findByIds(ids: OrderDetail['id'][]) {
    return this.orderDetailRepository.findByIds(ids);
  }
}
