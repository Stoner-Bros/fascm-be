import { HarvestScheduleDto } from '../../harvest-schedules/dto/harvest-schedule.dto';
import { CreateHarvestInvoiceDto } from '../../harvest-invoices/dto/create-harvest-invoice.dto';
import { CreateHarvestInvoiceDetailDto } from '../../harvest-invoice-details/dto/create-harvest-invoice-detail.dto';

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
  IsArray,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateHarvestPhaseDto {
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
    type: () => HarvestScheduleDto,
  })
  @ValidateNested()
  @Type(() => HarvestScheduleDto)
  @IsNotEmptyObject()
  harvestSchedule: HarvestScheduleDto;

  @ApiProperty({
    required: true,
    type: () => CreateHarvestInvoiceDto,
  })
  @ValidateNested()
  @Type(() => CreateHarvestInvoiceDto)
  harvestInvoice?: CreateHarvestInvoiceDto | null;

  @ApiProperty({
    required: true,
    type: () => [CreateHarvestInvoiceDetailDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateHarvestInvoiceDetailDto)
  @IsArray()
  harvestInvoiceDetails: CreateHarvestInvoiceDetailDto[];

  // Don't forget to use the class-validator decorators in the DTO properties.
}

export class CreateMultipleHarvestPhaseDto {
  @ApiProperty({
    required: true,
    type: () => [CreateHarvestPhaseDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateHarvestPhaseDto)
  @IsArray()
  harvestPhases: CreateHarvestPhaseDto[];
}
