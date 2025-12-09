import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { HarvestPhaseStatusEnum } from '../enum/harvest-phase-status.enum';

export class UpdateHarvestPhaseStatusDto {
  @ApiProperty({
    enum: HarvestPhaseStatusEnum,
    description: 'New status for the harvest phase',
  })
  @IsEnum(HarvestPhaseStatusEnum)
  status: HarvestPhaseStatusEnum;
}
