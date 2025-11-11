// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateHarvestTicketDto } from './create-harvest-ticket.dto';

export class UpdateHarvestTicketDto extends PartialType(
  CreateHarvestTicketDto,
) {}
