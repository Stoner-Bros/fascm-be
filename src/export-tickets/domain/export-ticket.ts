import { OrderDetail } from '../../order-details/domain/order-detail';
import { ApiProperty } from '@nestjs/swagger';

export class ExportTicket {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  numberOfBatch?: number | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  ExportDate?: Date | null;

  @ApiProperty({
    type: () => OrderDetail,
    nullable: true,
  })
  orderDetail?: OrderDetail | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
