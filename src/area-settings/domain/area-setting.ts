import { Area } from '../../areas/domain/area';
import { ApiProperty } from '@nestjs/swagger';

export class AreaSetting {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  humidityThreshold?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  temperatureThreshold?: number | null;

  @ApiProperty({
    type: () => Area,
    nullable: true,
  })
  area?: Area | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
