import { ApiProperty } from '@nestjs/swagger';
import { HarvestPhase } from 'src/harvest-phases/domain/harvest-phase';
import { OrderPhase } from 'src/order-phases/domain/order-phase';
import { FileType } from '../../files/domain/file';

export class ImageProof {
  @ApiProperty({
    type: () => OrderPhase,
    nullable: true,
  })
  orderPhase?: OrderPhase | null;

  @ApiProperty({
    type: () => HarvestPhase,
    nullable: true,
  })
  harvestPhase?: HarvestPhase | null;

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
