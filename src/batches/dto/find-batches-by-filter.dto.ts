import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindBatchesByFilterDto {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Area ID to filter batches',
  })
  @IsOptional()
  @IsString()
  areaId?: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Import Ticket ID to filter batches',
  })
  @IsOptional()
  @IsString()
  importTicketId?: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Product ID to filter batches',
  })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;
}
