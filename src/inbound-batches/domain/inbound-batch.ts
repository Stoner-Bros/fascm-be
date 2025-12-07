import { ApiProperty } from '@nestjs/swagger';
import { HarvestInvoiceDetail } from 'src/harvest-invoice-details/domain/harvest-invoice-detail';
import { ImportTicket } from 'src/import-tickets/domain/import-ticket';

export class InboundBatch {
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
    type: () => String,
    nullable: true,
  })
  batchCode?: string | null;

  @ApiProperty({
    type: () => ImportTicket,
    nullable: true,
  })
  importTicket?: ImportTicket | null;

  @ApiProperty({
    type: () => HarvestInvoiceDetail,
    nullable: true,
  })
  harvestInvoiceDetail?: HarvestInvoiceDetail | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
