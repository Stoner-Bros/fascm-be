import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStaff } from 'src/delivery-staffs/domain/delivery-staff';
import { TruckResponse } from 'src/trucks/dto/truck-response.dto';
import { DeliveryStatusEnum } from '../enum/delivery-status.enum';

export class DeliveryResponse {
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
    type: () => TruckResponse,
    nullable: true,
  })
  truck?: TruckResponse | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  harvestPhaseId?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  harvestScheduleId?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderPhaseId?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderScheduleId?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
