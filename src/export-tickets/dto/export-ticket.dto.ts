import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExportTicketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
