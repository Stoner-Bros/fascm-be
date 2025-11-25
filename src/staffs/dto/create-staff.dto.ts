import { WarehouseDto } from '../../warehouses/dto/warehouse.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { AuthRegisterLoginDto } from 'src/auth/dto/auth-register-login.dto';

export class StaffRegisterDto {
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
    type: () => String,
  })
  @IsOptional()
  @IsString()
  position?: string | null;
  // Don't forget to use the class-validator decorators in the DTO properties.
}

export class CreateStaffDto extends StaffRegisterDto {
  @ApiProperty({
    required: false,
    type: () => AuthRegisterLoginDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AuthRegisterLoginDto)
  @IsNotEmptyObject()
  user?: AuthRegisterLoginDto | null;
}
