import { Warehouse } from '../../warehouses/domain/warehouse';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Staff {
  @ApiProperty({
    type: () => Warehouse,
    nullable: true,
  })
  warehouse?: Warehouse | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  position?: string | null;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  user?: User | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
