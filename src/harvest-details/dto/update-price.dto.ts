import { IsNumber } from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class UpdateFinalPriceDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  finalUnitPrice: number;
  // Don't forget to use the class-validator decorators in the DTO properties.
}
