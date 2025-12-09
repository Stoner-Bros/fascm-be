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
import { ImportTicketDto } from 'src/import-tickets/dto/import-ticket.dto';

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
    type: () => ImportTicketDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImportTicketDto)
  @IsNotEmptyObject()
  importTicket?: ImportTicketDto | null;

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
