import { ProductDto } from '../../products/dto/product.dto';

import { HarvestDetailDto } from '../../harvest-details/dto/harvest-detail.dto';

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
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateInboundBatchDto {
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
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  batchCode?: string | null;

  @ApiProperty({
    required: false,
    type: () => ProductDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  product?: ProductDto | null;

  @ApiProperty({
    required: false,
    type: () => HarvestDetailDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => HarvestDetailDto)
  @IsNotEmptyObject()
  harvestDetail?: HarvestDetailDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
