// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePriceDto } from './create-price.dto';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {}
