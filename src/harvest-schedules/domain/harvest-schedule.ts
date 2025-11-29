import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';
import { HarvestScheduleStatusEnum } from '../enum/harvest-schedule-status.enum';

export class HarvestSchedule {
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
  supplierId?: Supplier | null;

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
