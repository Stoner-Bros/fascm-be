import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

const idType = Number;

export class Feature {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'Feature Name',
  })
  name?: string;
}
