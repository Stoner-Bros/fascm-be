import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { TruckStatusEnum } from '../enum/truck-status.enum';

export class FindAllTrucksDto {
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

  @ApiPropertyOptional({ enum: TruckStatusEnum })
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    const v = String(value).trim().toLowerCase();
    if (!v || v === 'all') return undefined;
    return value;
  })
  @IsEnum(TruckStatusEnum)
  @IsOptional()
  status?: TruckStatusEnum;

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
