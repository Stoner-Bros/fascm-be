import { Batch } from '../../batches/domain/batch';
import { OrderDetail } from '../../order-details/domain/order-detail';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailSelection {
  @ApiProperty({
    type: () => Batch,
    nullable: true,
  })
  batch?: Batch | null;

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
