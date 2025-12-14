import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsArray,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

class OrderInvoiceDetailWithBatchDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @Type(() => String)
  @IsString()
  orderInvoiceDetailId: string;

  @ApiProperty({
    required: true,
    type: [String],
  })
  @Type(() => String)
  @IsArray()
  selectionId: string[];
}

export class CreateExportTicketDto {
  @ApiProperty({
    required: true,
    type: [OrderInvoiceDetailWithBatchDto],
  })
  @ValidateNested({ each: true })
  @Type(() => OrderInvoiceDetailWithBatchDto)
  @IsArray()
  invoiceDetails: OrderInvoiceDetailWithBatchDto[];

  // Don't forget to use the class-validator decorators in the DTO properties.
}
