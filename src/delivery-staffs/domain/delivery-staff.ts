import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Warehouse } from '../../warehouses/domain/warehouse';

export class DeliveryStaff {
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
