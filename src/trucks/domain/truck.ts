import { Warehouse } from '../../warehouses/domain/warehouse';
import { IoTDevice } from '../../io-t-devices/domain/io-t-device';
import { ApiProperty } from '@nestjs/swagger';
import { TruckStatusEnum } from '../enum/truck-status.enum';

export class Truck {
  @ApiProperty({
    type: () => Warehouse,
    nullable: true,
  })
  warehouse?: Warehouse | null;

  @ApiProperty({
    enum: TruckStatusEnum,
    nullable: true,
  })
  status?: TruckStatusEnum | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  currentLocation?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  model?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  licensePhoto?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  licensePlate?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  capacity?: number | null;

  @ApiProperty({
    type: () => [IoTDevice],
    nullable: true,
  })
  iotDevice?: IoTDevice[] | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
