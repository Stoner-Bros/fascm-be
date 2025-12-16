import { ProductDto } from '../../products/dto/product.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsArray,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrderInvoiceDetailDto {
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
    type: [String],
    description: 'Selection IDs for creating export ticket',
  })
  @IsOptional()
  @IsArray()
  @Type(() => String)
  selectionIds?: string[] | null;
  // Don't forget to use the class-validator decorators in the DTO properties.
}
