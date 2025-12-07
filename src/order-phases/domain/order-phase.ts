import { OrderSchedule } from '../../order-schedules/domain/order-schedule';
import { ApiProperty } from '@nestjs/swagger';

export class OrderPhase {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  phaseNumber?: number | null;

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
