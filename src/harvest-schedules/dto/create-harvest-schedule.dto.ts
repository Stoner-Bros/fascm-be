import {
  Transform,
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { CreateHarvestDetailDto } from 'src/harvest-details/dto/create-harvest-detail.dto';
import { CreateHarvestTicketDto } from 'src/harvest-tickets/dto/create-harvest-ticket.dto';

export class CreateHarvestScheduleDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  address?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  harvestDate?: Date | null;

  @ApiProperty({
    required: true,
    type: () => CreateHarvestTicketDto,
  })
  @ValidateNested()
  @Type(() => CreateHarvestTicketDto)
  harvestTicket: CreateHarvestTicketDto;

  @ApiProperty({
    required: true,
    type: () => [CreateHarvestDetailDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateHarvestDetailDto)
  @IsArray()
  harvestDetails: CreateHarvestDetailDto[];
  // Don't forget to use the class-validator decorators in the DTO properties.
}
