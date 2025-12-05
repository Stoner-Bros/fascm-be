import { ApiProperty } from '@nestjs/swagger';

export class IoTDeviceResponse {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  truckId: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  areaId: string | null;

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
