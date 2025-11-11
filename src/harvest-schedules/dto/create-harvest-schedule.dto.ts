import { SupplierDto } from '../../suppliers/dto/supplier.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsDate,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateHarvestScheduleDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  harvestDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () => SupplierDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierDto)
  @IsNotEmptyObject()
  supplierId?: SupplierDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
