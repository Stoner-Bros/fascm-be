// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrderInvoiceDto } from './create-order-invoice.dto';

export class UpdateOrderInvoiceDto extends PartialType(CreateOrderInvoiceDto) {}
