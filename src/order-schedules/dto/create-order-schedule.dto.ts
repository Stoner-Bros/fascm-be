import { ConsigneeDto } from '../../consignees/dto/consignee.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsDate,
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
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  orderDate?: Date | null;

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
