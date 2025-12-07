import { ApiProperty } from '@nestjs/swagger';

export class ImportTicket {
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
    type: () => Date,
    nullable: true,
  })
  expiredAt?: Date | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
