import { Product } from '../../products/domain/product';
import { HarvestInvoice } from '../../harvest-invoices/domain/harvest-invoice';
import { ApiProperty } from '@nestjs/swagger';

export class HarvestInvoiceDetail {
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
    type: () => Product,
    nullable: true,
  })
  product?: Product | null;

  @ApiProperty({
    type: () => HarvestInvoice,
    nullable: true,
  })
  harvestInvoice?: HarvestInvoice | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
