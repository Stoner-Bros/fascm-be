import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderPhaseStatusEnum } from '../enum/order-phase-status.enum';

export class UpdateOrderPhaseStatusDto {
  @ApiProperty({
    enum: OrderPhaseStatusEnum,
    description: 'New status for the order phase',
  })
  @IsEnum(OrderPhaseStatusEnum)
  status: OrderPhaseStatusEnum;
}
