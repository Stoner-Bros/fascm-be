import { Truck } from '../../trucks/domain/truck';
import { ApiProperty } from '@nestjs/swagger';

export class TruckAlert {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  message?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  alertType?: string | null;

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
