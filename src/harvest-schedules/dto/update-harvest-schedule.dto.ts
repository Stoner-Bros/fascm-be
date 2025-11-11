// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateHarvestScheduleDto } from './create-harvest-schedule.dto';

export class UpdateHarvestScheduleDto extends PartialType(
  CreateHarvestScheduleDto,
) {}
