import { Area } from '../../areas/domain/area';
import { ApiProperty } from '@nestjs/swagger';

export class AreaAlert {
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
