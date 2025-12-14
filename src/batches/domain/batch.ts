import { ApiProperty } from '@nestjs/swagger';
import { Area } from '../../areas/domain/area';
import { ImportTicket } from '../../import-tickets/domain/import-ticket';
import { Product } from '../../products/domain/product';

export class Batch {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  costPrice?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  currentQuantity?: number | null;

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
    type: () => Date,
    nullable: true,
  })
  expiredAt?: Date | null;

  @ApiProperty({
    type: () => Area,
    nullable: true,
  })
  area?: Area | null;

  @ApiProperty({
    type: () => Product,
    nullable: true,
  })
  product?: Product | null;

  @ApiProperty({
    type: () => ImportTicket,
    nullable: true,
  })
  importTicket?: ImportTicket | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
