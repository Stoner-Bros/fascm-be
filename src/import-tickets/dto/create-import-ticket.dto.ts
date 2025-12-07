import { InboundBatchDto } from '../../inbound-batches/dto/inbound-batch.dto';

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
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { AreaDto } from 'src/areas/dto/area.dto';

export class CreateImportTicketDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  realityQuantity?: number | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  expiredAt?: Date | null;

  @ApiProperty({
    required: false,
    type: () => InboundBatchDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => InboundBatchDto)
  @IsNotEmptyObject()
  inboundBatch?: InboundBatchDto | null;

  @ApiProperty({
    required: false,
    type: () => AreaDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AreaDto)
  @IsNotEmptyObject()
  area?: AreaDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
