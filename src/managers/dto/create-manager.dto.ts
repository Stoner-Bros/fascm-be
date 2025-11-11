import { WarehouseDto } from '../../warehouses/dto/warehouse.dto';

import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateManagerDto {
  @ApiProperty({
    required: false,
    type: () => WarehouseDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WarehouseDto)
  @IsNotEmptyObject()
  warehouse?: WarehouseDto | null;

  @ApiProperty({
    required: false,
    type: () => UserDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user?: UserDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
