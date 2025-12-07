import { OrderInvoiceDetailDto } from './../../order-invoice-details/dto/order-invoice-detail.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsNotEmptyObject,
  IsOptional,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateExportTicketDto {
  @ApiProperty({
    required: false,
    type: () => OrderInvoiceDetailDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderInvoiceDetailDto)
  @IsNotEmptyObject()
  OrderInvoiceDetailDto?: OrderInvoiceDetailDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
