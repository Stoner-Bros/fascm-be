// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateImageProofDto } from './create-image-proof.dto';

export class UpdateImageProofDto extends PartialType(CreateImageProofDto) {}
