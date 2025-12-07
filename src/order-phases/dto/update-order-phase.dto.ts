// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrderPhaseDto } from './create-order-phase.dto';

export class UpdateOrderPhaseDto extends PartialType(CreateOrderPhaseDto) {}
