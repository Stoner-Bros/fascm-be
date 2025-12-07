import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  Transform,
  Type,
} from 'class-transformer';

export class CreateNotificationDto {
  @ApiProperty({
    required: false,
    type: () => UserDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user?: UserDto | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  deletedAt?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  type?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  message?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  title?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
