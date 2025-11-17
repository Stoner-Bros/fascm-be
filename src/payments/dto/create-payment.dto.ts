import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  qrCode?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  paymentCode?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  amount?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  paymentMethod?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
