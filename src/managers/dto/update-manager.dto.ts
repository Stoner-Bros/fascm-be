// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateManagerDto } from './create-manager.dto';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {}
