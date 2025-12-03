import { OrderSchedule } from '../../order-schedules/domain/order-schedule';
import { HarvestSchedule } from '../../harvest-schedules/domain/harvest-schedule';
import { FileType } from '../../files/domain/file';
import { ApiProperty } from '@nestjs/swagger';

export class ImageProof {
  @ApiProperty({
    type: () => OrderSchedule,
    nullable: true,
  })
  orderSchedule?: OrderSchedule | null;

  @ApiProperty({
    type: () => HarvestSchedule,
    nullable: true,
  })
  harvestSchedule?: HarvestSchedule | null;

  @ApiProperty({
    type: () => FileType,
    nullable: true,
  })
  photo?: FileType | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
