import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { PaymentMethod } from '../enums/payment-status.enum';

export class CreatePaymentDto {
  @ApiProperty({
    required: true,
    type: () => Number,
    default: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsString()
  @IsOptional()
  supplierId?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsString()
  @IsOptional()
  consigneeId?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
