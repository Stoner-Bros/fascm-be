import { ApiProperty } from '@nestjs/swagger';
import { OrderDetailSelectionResponse } from 'src/order-detail-selections/dto/order-detail-selection-response.dto';
import { ProductResponse } from 'src/products/dto/product-response.dto';

export class OrderInvoiceDetailResponse {
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
    type: () => [OrderDetailSelectionResponse],
  })
  orderDetailSelections: OrderDetailSelectionResponse[];

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
