import { TruckDto } from '../../trucks/dto/truck.dto';

import { WarehouseDto } from '../../warehouses/dto/warehouse.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { AuthRegisterLoginDto } from 'src/auth/dto/auth-register-login.dto';

export class DeliveryStaffRegisterDto {
  @ApiProperty({
    required: false,
    type: () => TruckDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TruckDto)
  @IsNotEmptyObject()
  truck?: TruckDto | null;

  @ApiProperty({
    required: false,
    type: () => WarehouseDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WarehouseDto)
  @IsNotEmptyObject()
  warehouse?: WarehouseDto | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  licenseExpiredAt?: Date | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  licensePhoto?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  licenseNumber?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}

export class CreateDeliveryStaffDto extends DeliveryStaffRegisterDto {
  @ApiProperty({
    required: true,
    type: () => AuthRegisterLoginDto,
  })
  @ValidateNested()
  @Type(() => AuthRegisterLoginDto)
  @IsNotEmptyObject()
  user: AuthRegisterLoginDto;
}
