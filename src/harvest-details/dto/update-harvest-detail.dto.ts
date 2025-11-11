// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateHarvestDetailDto } from './create-harvest-detail.dto';

export class UpdateHarvestDetailDto extends PartialType(
  CreateHarvestDetailDto,
) {}
