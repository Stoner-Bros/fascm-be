import { Payment } from '../../payments/domain/payment';
import { ApiProperty } from '@nestjs/swagger';
import { OrderPhase } from 'src/order-phases/domain/order-phase';

export class OrderInvoice {
  @ApiProperty({
    type: () => Payment,
    nullable: true,
  })
  payment?: Payment | null;

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
    type: () => OrderPhase,
    nullable: true,
  })
  orderPhase?: OrderPhase | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
