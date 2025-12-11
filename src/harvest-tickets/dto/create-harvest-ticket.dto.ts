import { IsOptional, IsString } from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateHarvestTicketDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  ticketNumber?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  ticketUrl?: string | null;
  // Don't forget to use the class-validator decorators in the DTO properties.
}
