import { OrderScheduleDto } from '../../order-schedules/dto/order-schedule.dto';

import { HarvestScheduleDto } from '../../harvest-schedules/dto/harvest-schedule.dto';

import { FileDto } from '../../files/dto/file.dto';

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

export class CreateImageProofDto {
  @ApiProperty({
    required: false,
    type: () => OrderScheduleDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => OrderScheduleDto)
  orderSchedule?: OrderScheduleDto | null;

  @ApiProperty({
    required: false,
    type: () => HarvestScheduleDto,
  })
  @ValidateNested()
  @Type(() => HarvestScheduleDto)
  @IsOptional()
  harvestSchedule?: HarvestScheduleDto | null;

  @ApiProperty({
    required: false,
    type: () => FileDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FileDto)
  @IsNotEmptyObject()
  photo?: FileDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
