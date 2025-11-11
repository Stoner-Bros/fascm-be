import { TruckDto } from '../../trucks/dto/truck.dto';

import { HarvestScheduleDto } from '../../harvest-schedules/dto/harvest-schedule.dto';

import { OrderScheduleDto } from '../../order-schedules/dto/order-schedule.dto';

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
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endTime?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startTime?: Date | null;

  @ApiProperty({
    required: false,
    type: () => TruckDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TruckDto)
  @IsNotEmptyObject()
  truck?: TruckDto | null;

  @ApiProperty({
    required: false,
    type: () => HarvestScheduleDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => HarvestScheduleDto)
  @IsNotEmptyObject()
  harvestSchedule?: HarvestScheduleDto | null;

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
