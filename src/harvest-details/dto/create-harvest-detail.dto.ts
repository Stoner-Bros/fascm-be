import { ProductDto } from '../../products/dto/product.dto';

import { HarvestTicketDto } from '../../harvest-tickets/dto/harvest-ticket.dto';

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

export class CreateHarvestDetailDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  taxRate?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  amount?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  unitPrice?: number | null;

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
    type: () => ProductDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  product?: ProductDto | null;

  @ApiProperty({
    required: false,
    type: () => HarvestTicketDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => HarvestTicketDto)
  @IsNotEmptyObject()
  harvestTicket?: HarvestTicketDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
