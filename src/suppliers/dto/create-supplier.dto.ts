import { WarehouseDto } from '../../warehouses/dto/warehouse.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';
import { AuthRegisterLoginDto } from 'src/auth/dto/auth-register-login.dto';

export class SupplierRegisterDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  contact?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  taxCode?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  address?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  certificate?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  qrCode?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  gardenName: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  representativeName: string;

  @ApiProperty({
    required: false,
    type: () => WarehouseDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WarehouseDto)
  @IsNotEmptyObject()
  warehouse?: WarehouseDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}

export class CreateSupplierDto extends SupplierRegisterDto {
  @ApiProperty({
    required: false,
    type: () => AuthRegisterLoginDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AuthRegisterLoginDto)
  @IsNotEmptyObject()
  user?: AuthRegisterLoginDto | null;
}
