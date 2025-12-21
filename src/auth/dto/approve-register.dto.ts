import { ApiProperty } from '@nestjs/swagger';

export class ApproveRegisterDto {
  @ApiProperty({ example: 1, type: Number })
  userId: number;
}
