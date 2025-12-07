import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RolePermissionDto {
  @ApiProperty()
  @IsNumber()
  id: number | string;
}
