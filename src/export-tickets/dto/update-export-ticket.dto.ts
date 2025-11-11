// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExportTicketDto } from './create-export-ticket.dto';

export class UpdateExportTicketDto extends PartialType(CreateExportTicketDto) {}
