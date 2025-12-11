import { ApiProperty } from '@nestjs/swagger';

export class ExportTicket {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  unit?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  exportDate?: Date | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  productName?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  numberOfBatch?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  areaName?: string | null;
}
