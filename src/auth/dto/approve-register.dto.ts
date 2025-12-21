import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ApproveRegisterDto {
  @ApiProperty({ example: 1, type: Number })
  @IsNumber()
  userId: number;
}
