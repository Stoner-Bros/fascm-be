import { ApiProperty } from '@nestjs/swagger';
import { OrderSchedule } from '../../order-schedules/domain/order-schedule';

export class Order {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  unit?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderNumber?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderUrl?: string | null;

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
