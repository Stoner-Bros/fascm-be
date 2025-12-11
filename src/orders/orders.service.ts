import {
  // common
  Injectable,
} from '@nestjs/common';
import { Order } from './domain/order';
import { OrderRepository } from './infrastructure/persistence/order.repository';

@Injectable()
export class OrdersService {
  constructor(
    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) {}
  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }
}
