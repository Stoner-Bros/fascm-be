import { InboundBatch } from '../../inbound-batches/domain/inbound-batch';
import { ApiProperty } from '@nestjs/swagger';

export class ImportTicket {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  numberOfBatch?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  percent?: number | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  importDate?: Date | null;

  @ApiProperty({
    type: () => InboundBatch,
    nullable: true,
  })
  inboundBatch?: InboundBatch | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
