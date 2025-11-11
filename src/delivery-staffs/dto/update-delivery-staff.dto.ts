// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryStaffDto } from './create-delivery-staff.dto';

export class UpdateDeliveryStaffDto extends PartialType(
  CreateDeliveryStaffDto,
) {}
