import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderScheduleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
