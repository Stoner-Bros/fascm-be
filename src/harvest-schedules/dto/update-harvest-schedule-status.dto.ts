import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { HarvestScheduleStatusEnum } from '../enum/harvest-schedule-status.enum';

export class UpdateHarvestScheduleStatusDto {
  @ApiProperty({
    enum: HarvestScheduleStatusEnum,
    description: 'New status for the harvest schedule',
  })
  @IsEnum(HarvestScheduleStatusEnum)
  status: HarvestScheduleStatusEnum;

  @ApiPropertyOptional({
    type: String,
    description: 'Reason for rejection (required when status is REJECTED)',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
