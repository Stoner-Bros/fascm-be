import { BatchDto } from '../../batches/dto/batch.dto';

import { OrderDetailDto } from '../../order-details/dto/order-detail.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrderDetailSelectionDto {
  @ApiProperty({
    required: false,
    type: () => BatchDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BatchDto)
  @IsNotEmptyObject()
  batch?: BatchDto | null;

  @ApiProperty({
    required: false,
    type: () => OrderDetailDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderDetailDto)
  @IsNotEmptyObject()
  orderDetail?: OrderDetailDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
