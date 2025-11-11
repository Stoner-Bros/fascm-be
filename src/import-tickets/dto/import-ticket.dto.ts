import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ImportTicketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
