import { ApiProperty } from '@nestjs/swagger';

export class Payment {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  paymentCode?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  amount?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  paymentMethod?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  checkoutUrl?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  qrCode?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
