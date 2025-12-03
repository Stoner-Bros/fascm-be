import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TruckStatusEnum } from '../enum/truck-status.enum';

export class UpdateTruckStatusDto {
  @ApiProperty({
    enum: TruckStatusEnum,
    description: 'New status for the truck',
  })
  @IsEnum(TruckStatusEnum)
  status: TruckStatusEnum;
}
