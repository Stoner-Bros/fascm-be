// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateAreaAlertDto } from './create-area-alert.dto';

export class UpdateAreaAlertDto extends PartialType(CreateAreaAlertDto) {}
