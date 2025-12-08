import { OrderScheduleDto } from '../../order-schedules/dto/order-schedule.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsArray,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { CreateOrderInvoiceDetailDto } from 'src/order-invoice-details/dto/create-order-invoice-detail.dto';
import { CreateOrderInvoiceDto } from '../../order-invoices/dto/create-order-invoice.dto';

export class CreateOrderPhaseDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  phaseNumber?: number | null;

  @ApiProperty({
    required: true,
    type: () => OrderScheduleDto,
  })
  @ValidateNested()
  @Type(() => OrderScheduleDto)
  @IsNotEmptyObject()
  orderSchedule: OrderScheduleDto;

  @ApiProperty({
    required: true,
    type: () => CreateOrderInvoiceDto,
  })
  @ValidateNested()
  @Type(() => CreateOrderInvoiceDto)
  orderInvoice?: CreateOrderInvoiceDto | null;

  @ApiProperty({
    required: true,
    type: () => [CreateOrderInvoiceDetailDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderInvoiceDetailDto)
  @IsArray()
  orderInvoiceDetails: CreateOrderInvoiceDetailDto[];

  // Don't forget to use the class-validator decorators in the DTO properties.
}

export class CreateMultipleOrderPhaseDto {
  @ApiProperty({
    required: true,
    type: () => [CreateOrderPhaseDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderPhaseDto)
  @IsArray()
  orderPhases: CreateOrderPhaseDto[];
}
