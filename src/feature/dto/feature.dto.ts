import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FeatureDto {
  @ApiProperty()
  @IsNumber()
  id: number | string;
}
