import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Notification {
  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  user?: User | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  deletedAt?: Date | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: true,
  })
  isRead?: boolean | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  type?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  data?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  message?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  title?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
