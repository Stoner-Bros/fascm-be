import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderInvoiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
