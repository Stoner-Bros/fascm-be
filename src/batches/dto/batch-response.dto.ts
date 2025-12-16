import { ApiProperty } from '@nestjs/swagger';
import { PriceResponse } from 'src/prices/dto/price-response.dto';
import { ProductResponse } from 'src/products/dto/product-response.dto';

export class BatchResponse {
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
    type: () => [PriceResponse],
  })
  price: PriceResponse[];

  @ApiProperty({
    type: () => ProductResponse,
    nullable: true,
  })
  product?: ProductResponse | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  gardenName?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  harvestDate?: Date | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
