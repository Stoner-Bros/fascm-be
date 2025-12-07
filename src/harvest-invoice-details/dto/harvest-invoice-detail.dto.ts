import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HarvestInvoiceDetailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
