import { ApiProperty } from '@nestjs/swagger';
import { HarvestDetailResponse } from 'src/harvest-details/dto/harvest-detail-response.dto';
import { HarvestTicketResponse } from 'src/harvest-tickets/dto/harvest-ticket-response.dto';
import { HarvestScheduleStatusEnum } from '../enum/harvest-schedule-status.enum';
import { Supplier } from 'src/suppliers/domain/supplier';

export class HarvestScheduleResponse {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  address?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    enum: HarvestScheduleStatusEnum,
    nullable: true,
  })
  status?: HarvestScheduleStatusEnum | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  harvestDate?: Date | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => Supplier,
  })
  supplier: Supplier | null;

  @ApiProperty({
    type: () => HarvestTicketResponse,
  })
  harvestTicket: HarvestTicketResponse;

  @ApiProperty({
    type: () => [HarvestDetailResponse],
  })
  harvestDetails: HarvestDetailResponse[];
}
