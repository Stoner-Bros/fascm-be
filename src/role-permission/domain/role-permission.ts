import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

const idType = Number;

export class RolePermission {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  @ApiProperty({
    type: idType,
  })
  roleId: number | string;

  @Allow()
  @ApiProperty({
    type: idType,
  })
  permissionId: number | string;

  @Allow()
  @ApiProperty({
    type: idType,
  })
  featureId: number | string;
}
