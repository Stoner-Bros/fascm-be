import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderScheduleStatusEnum } from '../enum/order-schedule-status.enum';

export class UpdateOrderScheduleStatusDto {
  @ApiProperty({
    enum: OrderScheduleStatusEnum,
    description: 'New status for the order schedule',
  })
  @IsEnum(OrderScheduleStatusEnum)
  status: OrderScheduleStatusEnum;
}
