import { Area } from '../../areas/domain/area';
import { ApiProperty } from '@nestjs/swagger';

export class AreaSetting {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  minStock?: number | null;

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
