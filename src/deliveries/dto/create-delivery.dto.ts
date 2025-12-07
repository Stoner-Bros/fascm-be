import { TruckDto } from '../../trucks/dto/truck.dto';

import {
  Transform,
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsDate,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { DeliveryStaffDto } from 'src/delivery-staffs/dto/delivery-staff.dto';
import { HarvestPhaseDto } from 'src/harvest-phases/dto/harvest-phase.dto';
import { OrderPhaseDto } from 'src/order-phases/dto/order-phase.dto';

export class CreateDeliveryDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  endLng?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  endLat?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  startLng?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  startLat?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  endAddress?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  startAddress?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startTime?: Date | null;

  @ApiProperty({
    required: false,
    type: () => TruckDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TruckDto)
  @IsNotEmptyObject()
  truck?: TruckDto | null;

  @ApiProperty({
    required: false,
    type: () => TruckDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DeliveryStaffDto)
  @IsNotEmptyObject()
  deliveryStaff?: DeliveryStaffDto | null;

  @ApiProperty({
    required: false,
    type: () => HarvestPhaseDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => HarvestPhaseDto)
  @IsNotEmptyObject()
  harvestPhase?: HarvestPhaseDto | null;

  @ApiProperty({
    required: false,
    type: () => OrderPhaseDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderPhaseDto)
  @IsNotEmptyObject()
  orderPhase?: OrderPhaseDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
