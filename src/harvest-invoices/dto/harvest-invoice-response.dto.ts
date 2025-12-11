import { ApiProperty } from '@nestjs/swagger';

export class HarvestInvoiceResponse {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalPayment?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalAmount?: number | null;

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
    type: () => Number,
    nullable: true,
  })
  vatAmount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  taxRate?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  accountNumber?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  paymentStatus?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  paymentMethod?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  invoiceNumber?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  invoiceUrl?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
