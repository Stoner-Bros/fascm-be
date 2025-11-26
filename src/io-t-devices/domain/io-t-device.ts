import { Truck } from '../../trucks/domain/truck';
import { Area } from '../../areas/domain/area';
import { ApiProperty } from '@nestjs/swagger';

export class IoTDevice {
  @ApiProperty({
    type: () => Truck,
    nullable: true,
  })
  truck: Truck | null;

  @ApiProperty({
    type: () => Area,
    nullable: true,
  })
  area: Area | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  data?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  lastDataTime?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  type?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
