import { ApiProperty } from '@nestjs/swagger';
import { HarvestSchedule } from '../../harvest-schedules/domain/harvest-schedule';
import { ImageProof } from 'src/image-proofs/domain/image-proof';
import { HarvestPhaseStatusEnum } from '../enum/harvest-phase-status.enum';

export class HarvestPhase {
  @ApiProperty({
    type: () => [ImageProof],
    nullable: true,
  })
  imageProof?: ImageProof[] | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    enum: HarvestPhaseStatusEnum,
    nullable: true,
  })
  status?: HarvestPhaseStatusEnum | null;

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
