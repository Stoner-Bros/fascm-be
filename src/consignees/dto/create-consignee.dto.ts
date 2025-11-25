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

export class ConsigneeRegisterDto {
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
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  organizationName?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  representativeName?: string | null;
  // Don't forget to use the class-validator decorators in the DTO properties.
}

export class CreateConsigneeDto extends ConsigneeRegisterDto {
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
