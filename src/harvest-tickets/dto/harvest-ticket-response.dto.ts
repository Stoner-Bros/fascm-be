import { ApiProperty } from '@nestjs/swagger';
export class HarvestTicketResponse {
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
  ticketNumber?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  ticketUrl?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
