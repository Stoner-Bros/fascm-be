import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderDetailSelectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
