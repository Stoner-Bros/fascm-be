import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { DeliveryStatusEnum } from '../enum/delivery-status.enum';

export class UpdateDeliveryStatusDto {
  @ApiProperty({
    enum: DeliveryStatusEnum,
    description: 'New status for the delivery',
  })
  @IsEnum(DeliveryStatusEnum)
  status: DeliveryStatusEnum;
}
