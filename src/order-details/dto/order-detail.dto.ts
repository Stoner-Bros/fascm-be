import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderDetailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
