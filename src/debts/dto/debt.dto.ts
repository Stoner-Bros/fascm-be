import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DebtDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
