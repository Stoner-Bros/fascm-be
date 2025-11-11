// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateImportTicketDto } from './create-import-ticket.dto';

export class UpdateImportTicketDto extends PartialType(CreateImportTicketDto) {}
