import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Supplier {
  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user: User;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  contact?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  taxCode?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  address?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  certificate?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  qrCode?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  gardenName: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  representativeName: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
