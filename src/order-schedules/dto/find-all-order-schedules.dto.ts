import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderScheduleStatusEnum } from '../enum/order-schedule-status.enum';

export class FindAllOrderSchedulesDto {
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

  @ApiPropertyOptional({ enum: OrderScheduleStatusEnum })
  @IsEnum(OrderScheduleStatusEnum)
  @IsOptional()
  status?: OrderScheduleStatusEnum;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Warehouse ID to filter batches',
  })
  @IsOptional()
  @IsString()
  warehouseId?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() : undefined,
  )
  @IsIn(['asc', 'desc'])
  @IsOptional()
  sort?: 'asc' | 'desc';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  deliveryStaffId?: string;
}
