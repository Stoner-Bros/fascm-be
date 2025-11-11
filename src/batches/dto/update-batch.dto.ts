// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateBatchDto } from './create-batch.dto';

export class UpdateBatchDto extends PartialType(CreateBatchDto) {}
