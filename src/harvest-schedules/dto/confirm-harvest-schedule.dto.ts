import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { HarvestScheduleStatusEnum } from '../harvest-schedule-status.enum';

export class ConfirmHarvestScheduleDto {
  @ApiProperty({
    enum: [
      HarvestScheduleStatusEnum.APPROVED,
      HarvestScheduleStatusEnum.REJECTED,
    ],
    description: 'Status to confirm: approve or reject',
  })
  @IsEnum(HarvestScheduleStatusEnum)
  status:
    | HarvestScheduleStatusEnum.APPROVED
    | HarvestScheduleStatusEnum.REJECTED;
}
