import { ConsigneeDto } from '../../consignees/dto/consignee.dto';

import {
  IsDate,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';
import { SupplierDto } from 'src/suppliers/dto/supplier.dto';
import {
  DebtStatusEnum,
  DebtTypeEnum,
  PartnerTypeEnum,
} from '../enum/debt.enum';

export class CreateDebtDto {
  @ApiProperty({
    required: false,
    type: () => ConsigneeDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConsigneeDto)
  @IsNotEmptyObject()
  consignee?: ConsigneeDto | null;

  @ApiProperty({
    required: false,
    type: () => ConsigneeDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierDto)
  @IsNotEmptyObject()
  supplier?: SupplierDto | null;

  @ApiProperty({
    enum: PartnerTypeEnum,
    default: PartnerTypeEnum.CONSIGNEE,
  })
  @IsEnum(PartnerTypeEnum)
  partnerType: PartnerTypeEnum;

  @ApiProperty({
    enum: DebtStatusEnum,
    default: DebtStatusEnum.UNPAID,
  })
  @IsEnum(DebtStatusEnum)
  status: DebtStatusEnum;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dueDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  creditLimit?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  remainingAmount?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  paidAmount?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  originalAmount?: number | null;

  @ApiProperty({
    enum: DebtTypeEnum,
    default: DebtTypeEnum.PAYABLE,
  })
  @IsEnum(DebtTypeEnum)
  debtType: DebtTypeEnum;
  // Don't forget to use the class-validator decorators in the DTO properties.
}
