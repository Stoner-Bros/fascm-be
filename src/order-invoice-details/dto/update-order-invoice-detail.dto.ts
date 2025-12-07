// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrderInvoiceDetailDto } from './create-order-invoice-detail.dto';

export class UpdateOrderInvoiceDetailDto extends PartialType(
  CreateOrderInvoiceDetailDto,
) {}
