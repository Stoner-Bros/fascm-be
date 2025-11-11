import { TruckDto } from '../../trucks/dto/truck.dto';

import { AreaDto } from '../../areas/dto/area.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsDate,
  ValidateNested,
  IsNotEmptyObject,
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

export class CreateIoTDeviceDto {
  @ApiProperty({
    required: true,
    type: () => TruckDto,
  })
  @ValidateNested()
  @Type(() => TruckDto)
  @IsNotEmptyObject()
  truck: TruckDto;

  @ApiProperty({
    required: true,
    type: () => AreaDto,
  })
  @ValidateNested()
  @Type(() => AreaDto)
  @IsNotEmptyObject()
  area: AreaDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  data?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  lastDataTime?: Date | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  type?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
