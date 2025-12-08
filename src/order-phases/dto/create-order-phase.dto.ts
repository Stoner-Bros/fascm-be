import { OrderScheduleDto } from '../../order-schedules/dto/order-schedule.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
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
    required: false,
    type: () => OrderScheduleDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderScheduleDto)
  @IsNotEmptyObject()
  orderSchedule?: OrderScheduleDto | null;

  @ApiProperty({
    required: false,
    type: () => CreateOrderInvoiceDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateOrderInvoiceDto)
  @IsNotEmptyObject()
  orderInvoice?: CreateOrderInvoiceDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
