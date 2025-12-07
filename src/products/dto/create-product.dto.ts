import { PriceDto } from '../../prices/dto/price.dto';

import { CategoryDto } from '../../categories/dto/category.dto';

import {
  IsNotEmptyObject,
  IsOptional,
  // decorators here
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    required: false,
    type: () => [PriceDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @IsArray()
  price?: PriceDto[] | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  image?: string | null;

  @ApiProperty({
    required: false,
    type: () => CategoryDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsNotEmptyObject()
  category?: CategoryDto | null;

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
  name?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
