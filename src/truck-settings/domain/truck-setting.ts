import { Truck } from '../../trucks/domain/truck';
import { ApiProperty } from '@nestjs/swagger';

export class TruckSetting {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  minHumidity?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  maxHumidity?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  minTemperature?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  maxTemperature?: number | null;

  @ApiProperty({
    type: () => Truck,
    nullable: true,
  })
  truck?: Truck | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
