import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HarvestScheduleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
