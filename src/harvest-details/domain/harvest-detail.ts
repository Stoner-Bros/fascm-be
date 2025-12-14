import { ApiProperty } from '@nestjs/swagger';
import { HarvestTicket } from '../../harvest-tickets/domain/harvest-ticket';
import { Product } from '../../products/domain/product';

export class HarvestDetail {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  finalUnitPrice?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  amount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  expectedUnitPrice?: number | null;

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
    type: () => Product,
    nullable: true,
  })
  product?: Product | null;

  @ApiProperty({
    type: () => HarvestTicket,
    nullable: true,
  })
  harvestTicket?: HarvestTicket | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
