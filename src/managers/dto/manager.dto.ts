import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ManagerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
