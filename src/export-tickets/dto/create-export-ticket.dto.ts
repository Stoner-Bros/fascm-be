import { OrderDetailDto } from '../../order-details/dto/order-detail.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateExportTicketDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  numberOfBatch?: number | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  ExportDate?: Date | null;

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
