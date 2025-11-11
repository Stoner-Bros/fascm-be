import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HarvestDetailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
