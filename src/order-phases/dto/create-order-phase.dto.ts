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
  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

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
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

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

  // Don't forget to use the class-validator decorators in the DTO properties.
}
