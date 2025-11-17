import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WebhookData {
  @ApiProperty({
    description: 'Order code',
    example: 123456,
  })
  @IsNumber()
  orderCode: number;

  @ApiProperty({
    description: 'Payment amount',
    example: 100000,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Payment description',
    example: 'Payment for order #123456',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Account number',
  })
  @IsString()
  accountNumber: string;

  @ApiProperty({
    description: 'Transaction reference',
  })
  @IsString()
  reference: string;

  @ApiProperty({
    description: 'Transaction date time',
  })
  @IsString()
  transactionDateTime: string;

  @ApiProperty({
    description: 'Currency',
    example: 'VND',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Payment link ID',
  })
  @IsString()
  paymentLinkId: string;

  @ApiProperty({
    description: 'Payment status code',
    example: '00',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Status description',
  })
  @IsString()
  desc: string;

  @ApiProperty({
    description: 'Counter account bank ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  counterAccountBankId?: string | null;

  @ApiProperty({
    description: 'Counter account bank name',
    required: false,
  })
  @IsOptional()
  @IsString()
  counterAccountBankName?: string | null;

  @ApiProperty({
    description: 'Counter account name',
    required: false,
  })
  @IsOptional()
  @IsString()
  counterAccountName?: string | null;

  @ApiProperty({
    description: 'Counter account number',
    required: false,
  })
  @IsOptional()
  @IsString()
  counterAccountNumber?: string | null;

  @ApiProperty({
    description: 'Virtual account name',
    required: false,
  })
  @IsOptional()
  @IsString()
  virtualAccountName?: string | null;

  @ApiProperty({
    description: 'Virtual account number',
    required: false,
  })
  @IsOptional()
  @IsString()
  virtualAccountNumber?: string | null;
}

export class PayOSWebhookDto {
  @ApiProperty({
    description: 'Response code',
    example: '00',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Response description',
    example: 'success',
  })
  @IsString()
  desc: string;

  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    description: 'Webhook data',
    type: WebhookData,
  })
  @ValidateNested()
  @Type(() => WebhookData)
  data: WebhookData;

  @ApiProperty({
    description: 'Payment signature for verification',
  })
  @IsString()
  signature: string;
}

export class CancelPaymentDto {
  @ApiProperty({
    description: 'Reason for cancellation',
    required: false,
    example: 'Customer requested cancellation',
  })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
