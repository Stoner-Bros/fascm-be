import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderInvoiceDetailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
