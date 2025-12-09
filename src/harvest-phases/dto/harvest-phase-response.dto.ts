import { ApiProperty } from '@nestjs/swagger';
import { HarvestInvoiceDetailResponse } from 'src/harvest-invoice-details/dto/harvest-invoice-detail-response';
import { HarvestInvoiceResponse } from 'src/harvest-invoices/dto/harvest-invoice-response.dto';
import { ImageProofResponse } from 'src/image-proofs/dto/image-proof-response.dto';
import { HarvestPhaseStatusEnum } from '../enum/harvest-phase-status.enum';

export class HarvestPhaseResponse {
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
    enum: HarvestPhaseStatusEnum,
    nullable: true,
  })
  status?: HarvestPhaseStatusEnum | null;

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
    type: () => HarvestInvoiceResponse,
  })
  harvestInvoice: HarvestInvoiceResponse;

  @ApiProperty({
    type: () => [HarvestInvoiceDetailResponse],
  })
  harvestInvoiceDetails: HarvestInvoiceDetailResponse[];
}
