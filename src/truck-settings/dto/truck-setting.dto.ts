import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TruckSettingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
