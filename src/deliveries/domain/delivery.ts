import { Truck } from '../../trucks/domain/truck';
import { HarvestSchedule } from '../../harvest-schedules/domain/harvest-schedule';
import { OrderSchedule } from '../../order-schedules/domain/order-schedule';
import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatusEnum } from '../enum/delivery-status.enum';

export class Delivery {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  endLng?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  endLat?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  startLng?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  startLat?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  endAddress?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  startAddress?: string | null;

  @ApiProperty({
    enum: DeliveryStatusEnum,
    nullable: true,
  })
  status?: DeliveryStatusEnum | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  endTime?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  startTime?: Date | null;

  @ApiProperty({
    type: () => Truck,
    nullable: true,
  })
  truck?: Truck | null;

  @ApiProperty({
    type: () => HarvestSchedule,
    nullable: true,
  })
  harvestSchedule?: HarvestSchedule | null;

  @ApiProperty({
    type: () => OrderSchedule,
    nullable: true,
  })
  orderSchedule?: OrderSchedule | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
