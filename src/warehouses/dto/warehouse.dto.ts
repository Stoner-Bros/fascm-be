import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WarehouseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
