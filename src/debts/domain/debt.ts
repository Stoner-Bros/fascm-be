import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from 'src/suppliers/domain/supplier';
import { Consignee } from '../../consignees/domain/consignee';
import {
  DebtStatusEnum,
  DebtTypeEnum,
  PartnerTypeEnum,
} from '../enum/debt.enum';

export class Debt {
  @ApiProperty({
    type: () => Consignee,
    nullable: true,
  })
  consignee?: Consignee | null;

  @ApiProperty({
    type: () => Supplier,
    nullable: true,
  })
  supplier?: Supplier | null;

  @ApiProperty({
    enum: PartnerTypeEnum,
    nullable: true,
  })
  partnerType?: PartnerTypeEnum | null;

  @ApiProperty({
    enum: DebtStatusEnum,
    nullable: true,
  })
  status?: DebtStatusEnum | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  dueDate?: Date | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  creditLimit?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  remainingAmount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  paidAmount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  originalAmount?: number | null;

  @ApiProperty({
    enum: DebtTypeEnum,
    nullable: true,
  })
  debtType?: DebtTypeEnum | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
