import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TruckDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
