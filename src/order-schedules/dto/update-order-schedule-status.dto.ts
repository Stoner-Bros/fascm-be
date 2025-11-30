import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderScheduleStatusEnum } from '../enum/order-schedule-status.enum';

export class UpdateOrderScheduleStatusDto {
  @ApiProperty({
    enum: OrderScheduleStatusEnum,
    description: 'New status for the order schedule',
  })
  @IsEnum(OrderScheduleStatusEnum)
  status: OrderScheduleStatusEnum;

  @ApiPropertyOptional({
    type: String,
    description: 'Reason for rejection (required when status is REJECTED)',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
