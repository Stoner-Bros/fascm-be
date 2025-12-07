import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

const idType = Number;

export class Permission {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'Permission Name',
  })
  name?: string;
}
