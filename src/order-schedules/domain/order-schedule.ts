import { Consignee } from '../../consignees/domain/consignee';
import { ApiProperty } from '@nestjs/swagger';
import { OrderScheduleStatusEnum } from '../enum/order-schedule-status.enum';

export class OrderSchedule {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    enum: OrderScheduleStatusEnum,
    nullable: true,
  })
  status?: OrderScheduleStatusEnum | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  orderDate?: Date | null;

  @ApiProperty({
    type: () => Consignee,
    nullable: true,
  })
  consignee?: Consignee | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
