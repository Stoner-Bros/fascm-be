// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateHarvestInvoiceDto } from './create-harvest-invoice.dto';

export class UpdateHarvestInvoiceDto extends PartialType(
  CreateHarvestInvoiceDto,
) {}
