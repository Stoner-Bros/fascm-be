import { OrderDetail } from '../../order-details/domain/order-detail';
import { Area } from '../../areas/domain/area';
import { Product } from '../../products/domain/product';
import { ImportTicket } from '../../import-tickets/domain/import-ticket';
import { ApiProperty } from '@nestjs/swagger';

export class Batch {
  @ApiProperty({
    type: () => OrderDetail,
    nullable: true,
  })
  orderDetail?: OrderDetail | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  volume?: number | null;

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
