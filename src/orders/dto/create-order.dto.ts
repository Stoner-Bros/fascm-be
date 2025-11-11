import { PaymentDto } from '../../payments/dto/payment.dto';

import { OrderScheduleDto } from '../../order-schedules/dto/order-schedule.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  totalVolume?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  totalMass?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  totalPayment?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  vatAmount?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  totalAmount?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  taxRate?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  orderDate?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  orderUrl?: string | null;

  @ApiProperty({
    required: false,
    type: () => PaymentDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentDto)
  @IsNotEmptyObject()
  payment?: PaymentDto | null;

  @ApiProperty({
    required: false,
    type: () => OrderScheduleDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderScheduleDto)
  @IsNotEmptyObject()
  orderSchedule?: OrderScheduleDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
