import { AreaDto } from '../../areas/dto/area.dto';

import { ProductDto } from '../../products/dto/product.dto';

import { ImportTicketDto } from '../../import-tickets/dto/import-ticket.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
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

export class CreateBatchDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  costPrice?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  currentQuantity?: number | null;

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
    type: () => Date,
  })
  @IsOptional()
  expiredAt?: Date | null;

  @ApiProperty({
    required: false,
    type: () => AreaDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AreaDto)
  @IsNotEmptyObject()
  area?: AreaDto | null;

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
    type: () => ImportTicketDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImportTicketDto)
  @IsNotEmptyObject()
  importTicket?: ImportTicketDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
