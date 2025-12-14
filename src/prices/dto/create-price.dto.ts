import {
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  // decorators here
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';
import { BatchDto } from 'src/batches/dto/batch.dto';

export class CreatePriceDto {
  @ApiProperty({
    required: true,
    type: () => BatchDto,
  })
  @ValidateNested()
  @Type(() => BatchDto)
  @IsNotEmptyObject()
  batch: BatchDto;

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
