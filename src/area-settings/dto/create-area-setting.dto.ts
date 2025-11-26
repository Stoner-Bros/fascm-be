import { AreaDto } from '../../areas/dto/area.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAreaSettingDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  minHumidity?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  maxHumidity?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  minTemperature?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  maxTemperature?: number | null;

  @ApiProperty({
    required: false,
    type: () => AreaDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AreaDto)
  @IsNotEmptyObject()
  area?: AreaDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
