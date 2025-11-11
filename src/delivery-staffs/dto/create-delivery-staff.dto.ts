import { TruckDto } from '../../trucks/dto/truck.dto';

import { WarehouseDto } from '../../warehouses/dto/warehouse.dto';

import { UserDto } from '../../users/dto/user.dto';

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

export class CreateDeliveryStaffDto {
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

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user: UserDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
