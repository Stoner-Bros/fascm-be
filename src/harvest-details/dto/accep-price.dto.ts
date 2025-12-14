import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AcceptPriceDto {
  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  finalUnitPriceAccepted: boolean;
  // Don't forget to use the class-validator decorators in the DTO properties.
}
