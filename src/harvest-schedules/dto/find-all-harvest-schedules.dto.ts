import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { HarvestScheduleStatusEnum } from '../enum/harvest-schedule-status.enum';

export class FindAllHarvestSchedulesDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ enum: HarvestScheduleStatusEnum })
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    const v = String(value).trim().toLowerCase();
    if (!v || v === 'all') return undefined;
    return value;
  })
  @IsEnum(HarvestScheduleStatusEnum)
  @IsOptional()
  status?: HarvestScheduleStatusEnum;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  warehouseId?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() : undefined,
  )
  @IsIn(['asc', 'desc'])
  @IsOptional()
  sort?: 'asc' | 'desc';
}
