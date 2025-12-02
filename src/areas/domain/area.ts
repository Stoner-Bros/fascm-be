import { IoTDevice } from '../../io-t-devices/domain/io-t-device';
import { Warehouse } from '../../warehouses/domain/warehouse';
import { ApiProperty } from '@nestjs/swagger';

export class Area {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  availableCapacity?: number | null;

  @ApiProperty({
    type: () => [IoTDevice],
    nullable: true,
  })
  iotDevice?: IoTDevice[] | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  capacity?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  location?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  name?: string | null;

  @ApiProperty({
    type: () => Warehouse,
    nullable: true,
  })
  warehouse?: Warehouse | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
