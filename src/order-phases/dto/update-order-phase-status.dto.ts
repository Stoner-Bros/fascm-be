import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderPhaseStatusEnum } from '../enum/order-phase-status.enum';

export class UpdateOrderPhaseStatusDto {
  @ApiProperty({
    enum: OrderPhaseStatusEnum,
    description: 'New status for the order phase',
  })
  @IsEnum(OrderPhaseStatusEnum)
  status: OrderPhaseStatusEnum;

  @ApiPropertyOptional({
    type: String,
    description: 'Reason for rejection (required when status is REJECTED)',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
