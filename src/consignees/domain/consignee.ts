import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Consignee {
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
    nullable: true,
  })
  organizationName?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  representativeName?: string | null;

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
