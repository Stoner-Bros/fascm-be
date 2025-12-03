import { IoTDeviceDto } from '../../io-t-devices/dto/io-t-device.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateTruckDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  currentLocation?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  model?: string | null;

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
  licensePlate?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  capacity?: number | null;

  @ApiProperty({
    required: false,
    type: () => [IoTDeviceDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => IoTDeviceDto)
  @IsArray()
  iotDevice?: IoTDeviceDto[] | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
