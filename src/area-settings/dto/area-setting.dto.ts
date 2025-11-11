import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AreaSettingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
