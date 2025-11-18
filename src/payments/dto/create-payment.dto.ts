import {
  IsNumber,
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
    type: () => Number,
    description: 'Payment amount in VND',
    example: 100000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

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
