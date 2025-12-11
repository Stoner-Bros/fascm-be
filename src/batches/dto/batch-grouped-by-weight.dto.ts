import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from '../../products/dto/product-response.dto';

export class BatchGroupedByWeightDto {
  @ApiProperty({
    type: String,
    description: 'Import Ticket ID',
  })
  importTicketId: string;

  @ApiProperty({
    type: () => ProductResponse,
    description: 'Product information',
  })
  product: ProductResponse;

  @ApiProperty({
    type: Object,
    description:
      'Batch counts by weight (e.g., {"20kg": 4, "10kg": 5, "7kg": 1})',
    example: { '20kg': 4, '10kg': 5, '7kg': 1 },
  })
  batch: Record<string, number>;

  @ApiProperty({
    type: String,
    description:
      'Batch code (single code as all batches in same import ticket have same code)',
  })
  batchCode: string;

  @ApiProperty({
    type: Date,
    nullable: true,
    description: 'Expiration date',
  })
  expiredAt?: Date | null;

  @ApiProperty({
    type: Date,
    description: 'Import date',
  })
  importDate?: Date;

  @ApiProperty({
    type: Object,
    description:
      'Prices by quantity (e.g., {"1kg": 50000, "10kg": 45000, "20kg": 40000})',
    example: { '1kg': 50000, '10kg': 45000, '20kg': 40000 },
  })
  prices: Record<string, number>;
}
