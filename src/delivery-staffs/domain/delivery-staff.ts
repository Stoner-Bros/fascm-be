import { Truck } from '../../trucks/domain/truck';
import { Warehouse } from '../../warehouses/domain/warehouse';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class DeliveryStaff {
  @ApiProperty({
    type: () => Truck,
    nullable: true,
  })
  truck?: Truck | null;

  @ApiProperty({
    type: () => Warehouse,
    nullable: true,
  })
  warehouse?: Warehouse | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  licenseExpiredAt?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  licensePhoto?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  licenseNumber?: string | null;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
