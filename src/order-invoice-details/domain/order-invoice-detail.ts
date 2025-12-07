import { ExportTicket } from '../../export-tickets/domain/export-ticket';
import { Product } from '../../products/domain/product';
import { OrderInvoice } from '../../order-invoices/domain/order-invoice';
import { ApiProperty } from '@nestjs/swagger';

export class OrderInvoiceDetail {
  @ApiProperty({
    type: () => ExportTicket,
    nullable: true,
  })
  exportTicket?: ExportTicket | null;

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
    type: () => OrderInvoice,
    nullable: true,
  })
  orderInvoice?: OrderInvoice | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
