import { Product } from '../../products/domain/product';
import { Order } from '../../orders/domain/order';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetail {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  taxRate?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  amount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  unitPrice?: number | null;

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
    type: () => Order,
    nullable: true,
  })
  order?: Order | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
