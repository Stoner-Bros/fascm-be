import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from '../../suppliers/domain/supplier';
import { HarvestScheduleStatusEnum } from '../enum/harvest-schedule-status.enum';

export class HarvestSchedule {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  address?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    enum: HarvestScheduleStatusEnum,
    nullable: true,
  })
  status?: HarvestScheduleStatusEnum | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  harvestDate?: Date | null;

  @ApiProperty({
    type: () => Supplier,
    nullable: true,
  })
  supplier?: Supplier | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  //add reason for rejection
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  reason?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
