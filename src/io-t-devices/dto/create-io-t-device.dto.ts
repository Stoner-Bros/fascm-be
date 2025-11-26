import { TruckDto } from '../../trucks/dto/truck.dto';

import { AreaDto } from '../../areas/dto/area.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsDate,
  ValidateNested,
  ValidateIf,
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
    required: false,
    type: () => TruckDto,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((o) => o.truck?.id !== null && o.truck?.id !== undefined)
  @ValidateNested()
  @Type(() => TruckDto)
  truck?: TruckDto | null;

  @ApiProperty({
    required: false,
    type: () => AreaDto,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((o) => o.area?.id !== null && o.area?.id !== undefined)
  @ValidateNested()
  @Type(() => AreaDto)
  area?: AreaDto | null;

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
