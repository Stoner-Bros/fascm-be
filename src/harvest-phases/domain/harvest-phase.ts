import { HarvestSchedule } from '../../harvest-schedules/domain/harvest-schedule';
import { ApiProperty } from '@nestjs/swagger';

export class HarvestPhase {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  phaseNumber?: number | null;

  @ApiProperty({
    type: () => HarvestSchedule,
    nullable: true,
  })
  harvestSchedule?: HarvestSchedule | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
