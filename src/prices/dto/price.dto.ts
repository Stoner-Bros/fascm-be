import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PriceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
