import { InboundBatchDto } from '../../inbound-batches/dto/inbound-batch.dto';

import {
  Transform,
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { AreaDto } from 'src/areas/dto/area.dto';

export class CreateImportTicketDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNotEmpty()
  @IsNumber()
  realityQuantity: number;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  expiredAt?: Date | null;

  @ApiProperty({
    required: true,
    type: () => InboundBatchDto,
  })
  @ValidateNested()
  @Type(() => InboundBatchDto)
  @IsNotEmptyObject()
  inboundBatch: InboundBatchDto;

  @ApiProperty({
    required: true,
    type: () => AreaDto,
  })
  @ValidateNested()
  @Type(() => AreaDto)
  @IsNotEmptyObject()
  area: AreaDto;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  numberOfBigBatch?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  numberOfSmallBatch?: number | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
