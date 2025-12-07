import { HarvestScheduleDto } from '../../harvest-schedules/dto/harvest-schedule.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateHarvestTicketDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  ticketNumber?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  ticketUrl?: string | null;

  @ApiProperty({
    required: false,
    type: () => HarvestScheduleDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => HarvestScheduleDto)
  @IsNotEmptyObject()
  harvestSchedule?: HarvestScheduleDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
