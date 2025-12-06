import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../domain/order';
import { OrderDetail } from '../../order-details/domain/order-detail';

export class OrderWithDetailsResponseDto {
  @ApiProperty({ type: () => Order })
  order!: Order;

  @ApiProperty({ type: () => [OrderDetail] })
  orderDetails!: OrderDetail[];
}
