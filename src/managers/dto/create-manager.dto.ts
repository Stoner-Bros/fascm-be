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
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { AuthRegisterLoginDto } from 'src/auth/dto/auth-register-login.dto';

export class ManagerRegisterDto {
  @ApiProperty({
    required: false,
    type: () => WarehouseDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WarehouseDto)
  @IsNotEmptyObject()
  warehouse?: WarehouseDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}

export class CreateManagerDto extends ManagerRegisterDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
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
