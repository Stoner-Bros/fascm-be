import { ProductDto } from '../../products/dto/product.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { HarvestInvoiceDetailDto } from 'src/harvest-invoice-details/dto/harvest-invoice-detail.dto';
import { ImportTicket } from 'src/import-tickets/domain/import-ticket';

export class CreateInboundBatchDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  unit?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  batchCode?: string | null;

  @ApiProperty({
    required: false,
    type: () => ProductDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImportTicket)
  @IsNotEmptyObject()
  importTicket?: ImportTicket | null;

  @ApiProperty({
    required: false,
    type: () => HarvestInvoiceDetailDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => HarvestInvoiceDetailDto)
  @IsNotEmptyObject()
  harvestInvoiceDetail?: HarvestInvoiceDetailDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
