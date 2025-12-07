import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class Price {
  @ApiProperty({
    type: () => Product,
    nullable: false,
  })
  product: Product;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  price?: number | null;

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
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
