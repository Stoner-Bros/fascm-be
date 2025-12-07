import { ProductDto } from '../../products/dto/product.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreatePriceDto {
  @ApiProperty({
    required: true,
    type: () => ProductDto,
  })
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  product: ProductDto;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  price?: number | null;

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
  })
  @IsOptional()
  @IsString()
  unit?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
