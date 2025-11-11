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
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAreaAlertDto {
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
  message?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  alertType?: string | null;

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
