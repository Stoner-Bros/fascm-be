import { FileDto } from '../../files/dto/file.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsNotEmptyObject,
  IsOptional,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { HarvestPhaseDto } from 'src/harvest-phases/dto/harvest-phase.dto';
import { OrderPhaseDto } from 'src/order-phases/dto/order-phase.dto';

export class CreateImageProofDto {
  @ApiProperty({
    required: false,
    type: () => OrderPhaseDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => OrderPhaseDto)
  orderPhase?: OrderPhaseDto | null;

  @ApiProperty({
    required: false,
    type: () => HarvestPhaseDto,
  })
  @ValidateNested()
  @Type(() => HarvestPhaseDto)
  @IsOptional()
  harvestPhase?: HarvestPhaseDto | null;

  @ApiProperty({
    required: false,
    type: () => FileDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FileDto)
  @IsNotEmptyObject()
  photo?: FileDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
