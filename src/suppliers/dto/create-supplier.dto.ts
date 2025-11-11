import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateSupplierDto {
  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user: UserDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  contact?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  taxCode?: string | null;

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
  certificate?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  qrCode?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  gardenName: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  representativeName: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
