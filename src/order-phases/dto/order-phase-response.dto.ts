import { ApiProperty } from '@nestjs/swagger';
import { ImageProofResponse } from 'src/image-proofs/dto/image-proof-response.dto';
import { OrderInvoiceDetailResponse } from 'src/order-invoice-details/dto/order-invoice-detail-response';
import { OrderInvoiceResponse } from 'src/order-invoices/dto/order-invoice-response.dto';
import { OrderPhaseStatusEnum } from '../enum/order-phase-status.enum';

export class OrderPhaseResponse {
  @ApiProperty({
    type: () => [ImageProofResponse],
    nullable: true,
  })
  imageProof?: ImageProofResponse[] | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    enum: OrderPhaseStatusEnum,
    nullable: true,
  })
  status?: OrderPhaseStatusEnum | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  phaseNumber?: number | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => OrderInvoiceResponse,
  })
  orderInvoice: OrderInvoiceResponse;

  @ApiProperty({
    type: () => [OrderInvoiceDetailResponse],
  })
  orderInvoiceDetails: OrderInvoiceDetailResponse[];
}
