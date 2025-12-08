import { ApiProperty } from '@nestjs/swagger';
import { OrderDetailResponseDto } from 'src/order-details/dto/order-detail-response.dto';
import { OrderResponseDto } from 'src/orders/dto/order-response.dto';
import { Consignee } from '../../consignees/domain/consignee';
import { OrderScheduleStatusEnum } from '../enum/order-schedule-status.enum';

export class OrderScheduleResponse {
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
    enum: OrderScheduleStatusEnum,
    nullable: true,
  })
  status?: OrderScheduleStatusEnum | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  deliveryDate?: Date | null;

  @ApiProperty({
    type: () => Consignee,
    nullable: true,
  })
  consignee?: Consignee | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  reason?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => OrderResponseDto,
  })
  order: OrderResponseDto;

  @ApiProperty({
    type: () => [OrderDetailResponseDto],
  })
  orderDetails: OrderDetailResponseDto[];
}
