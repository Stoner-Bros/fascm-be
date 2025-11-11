// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateTruckDto } from './create-truck.dto';

export class UpdateTruckDto extends PartialType(CreateTruckDto) {}
