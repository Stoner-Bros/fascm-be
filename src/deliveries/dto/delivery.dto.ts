import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeliveryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
