import { Product } from '../../products/domain/product';
import { HarvestDetail } from '../../harvest-details/domain/harvest-detail';
import { ApiProperty } from '@nestjs/swagger';

export class InboundBatch {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  unit?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  batchCode?: string | null;

  @ApiProperty({
    type: () => Product,
    nullable: true,
  })
  product?: Product | null;

  @ApiProperty({
    type: () => HarvestDetail,
    nullable: true,
  })
  harvestDetail?: HarvestDetail | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
