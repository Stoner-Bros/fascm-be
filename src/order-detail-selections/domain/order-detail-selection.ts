import { ExportTicket } from '../../export-tickets/domain/export-ticket';
import { Batch } from '../../batches/domain/batch';
import { OrderDetail } from '../../order-details/domain/order-detail';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailSelection {
  @ApiProperty({
    type: () => ExportTicket,
    nullable: true,
  })
  exportTicket?: ExportTicket | null;

  @ApiProperty({
    type: () => Batch,
    nullable: true,
  })
  batch?: Batch | null;

  @ApiProperty({
    type: () => OrderDetail,
    nullable: true,
  })
  orderDetail?: OrderDetail | null;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  unitPrice?: number | null;

  @ApiProperty({
    type: String,
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
