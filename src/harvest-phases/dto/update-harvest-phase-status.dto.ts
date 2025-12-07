import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { HarvestPhaseStatusEnum } from '../enum/harvest-phase-status.enum';

export class UpdateHarvestPhaseStatusDto {
  @ApiProperty({
    enum: HarvestPhaseStatusEnum,
    description: 'New status for the harvest phase',
  })
  @IsEnum(HarvestPhaseStatusEnum)
  status: HarvestPhaseStatusEnum;

  @ApiPropertyOptional({
    type: String,
    description: 'Reason for rejection (required when status is REJECTED)',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
