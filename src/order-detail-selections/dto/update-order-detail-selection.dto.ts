// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailSelectionDto } from './create-order-detail-selection.dto';

export class UpdateOrderDetailSelectionDto extends PartialType(
  CreateOrderDetailSelectionDto,
) {}
