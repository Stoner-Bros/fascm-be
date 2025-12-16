import { ApiProperty } from '@nestjs/swagger';
import { BatchResponse } from 'src/batches/dto/batch-response.dto';
import { Batch } from '../../batches/domain/batch';

export class OrderDetailSelectionResponse {
  @ApiProperty({
    type: () => Batch,
    nullable: true,
  })
  batch?: BatchResponse | null;

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
