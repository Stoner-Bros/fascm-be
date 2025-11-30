import { ConsigneeDto } from '../../consignees/dto/consignee.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsNotEmptyObject,
  IsOptional,
  // decorators here
  ValidateNested,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrderScheduleDto {
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
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => ConsigneeDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConsigneeDto)
  @IsNotEmptyObject()
  consignee?: ConsigneeDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
