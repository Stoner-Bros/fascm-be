import { IoTDeviceDto } from '../../io-t-devices/dto/io-t-device.dto';

import { WarehouseDto } from '../../warehouses/dto/warehouse.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  unit?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
    default: 'available',
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => [IoTDeviceDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => IoTDeviceDto)
  @IsArray()
  iotDevice?: IoTDeviceDto[] | null;

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
  location?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  name?: string | null;

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
