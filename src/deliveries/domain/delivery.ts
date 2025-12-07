import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStaff } from 'src/delivery-staffs/domain/delivery-staff';
import { HarvestPhase } from 'src/harvest-phases/domain/harvest-phase';
import { OrderPhase } from 'src/order-phases/domain/order-phase';
import { Truck } from '../../trucks/domain/truck';
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
    type: () => DeliveryStaff,
    nullable: true,
  })
  deliveryStaff?: DeliveryStaff | null;

  @ApiProperty({
    type: () => Truck,
    nullable: true,
  })
  truck?: Truck | null;

  @ApiProperty({
    type: () => HarvestPhase,
    nullable: true,
  })
  harvestPhase?: HarvestPhase | null;

  @ApiProperty({
    type: () => OrderPhase,
    nullable: true,
  })
  orderPhase?: OrderPhase | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
