import { Payment } from '../../payments/domain/payment';
import { OrderSchedule } from '../../order-schedules/domain/order-schedule';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalVolume?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalMass?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalPayment?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  vatAmount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalAmount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  taxRate?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderDate?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderUrl?: string | null;

  @ApiProperty({
    type: () => Payment,
    nullable: true,
  })
  payment?: Payment | null;

  @ApiProperty({
    type: () => OrderSchedule,
    nullable: true,
  })
  orderSchedule?: OrderSchedule | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
