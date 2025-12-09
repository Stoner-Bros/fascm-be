import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from 'src/products/dto/product-response.dto';

export class HarvestInvoiceDetailResponse {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  amount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  taxRate?: number | null;

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
    type: () => ProductResponse,
    nullable: true,
  })
  product?: ProductResponse | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
