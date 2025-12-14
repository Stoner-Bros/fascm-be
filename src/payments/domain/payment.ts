import { ApiProperty } from '@nestjs/swagger';
import { Debt } from 'src/debts/domain/debt';
import {
  PaymentMethod,
  PaymentStatus,
  PaymentType,
} from '../enums/payment-status.enum';

export class Payment {
  @ApiProperty({
    type: () => Debt,
    nullable: true,
  })
  debt?: Debt | null;

  @ApiProperty({
    nullable: true,
    enum: PaymentType,
  })
  paymentType?: PaymentType | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  qrCode?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  paymentCode?: string | null;

  @ApiProperty({
    nullable: true,
    enum: PaymentStatus,
  })
  status?: PaymentStatus | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  amount?: number | null;

  @ApiProperty({
    nullable: true,
    enum: PaymentMethod,
  })
  paymentMethod?: PaymentMethod | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  checkoutUrl?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
