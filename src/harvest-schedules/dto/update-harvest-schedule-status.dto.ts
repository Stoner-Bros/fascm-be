import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { HarvestScheduleStatusEnum } from '../enum/harvest-schedule-status.enum';

export class UpdateHarvestScheduleStatusDto {
  @ApiProperty({
    enum: HarvestScheduleStatusEnum,
    description: 'New status for the harvest schedule',
  })
  @IsEnum(HarvestScheduleStatusEnum)
  status: HarvestScheduleStatusEnum;
}
