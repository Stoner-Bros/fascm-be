import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AreaAlertDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
