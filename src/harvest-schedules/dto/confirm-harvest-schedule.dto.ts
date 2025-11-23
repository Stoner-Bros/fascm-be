import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({
    type: String,
    required: false,
    description:
      'Reason for rejection (optional, but recommended when rejecting)',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
