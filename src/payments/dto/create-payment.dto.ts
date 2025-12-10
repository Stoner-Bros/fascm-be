import {
  // decorators here
  IsString,
  IsNotEmpty,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    required: true,
    type: () => String,
    description: 'Order invoice ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  orderInvoiceId: string;

  @ApiProperty({
    required: true,
    type: () => String,
    description: 'Payment method: transfer, cash, etc.',
    example: 'transfer',
  })
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
