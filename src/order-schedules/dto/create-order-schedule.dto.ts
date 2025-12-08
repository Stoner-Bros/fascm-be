import {
  Transform,
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { CreateOrderDetailDto } from 'src/order-details/dto/create-order-detail.dto';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

export class CreateOrderScheduleDto {
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
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  deliveryDate?: Date | null;

  @ApiProperty({
    required: true,
    type: () => CreateOrderDto,
  })
  @ValidateNested()
  @Type(() => CreateOrderDto)
  order: CreateOrderDto;

  @ApiProperty({
    required: true,
    type: () => [CreateOrderDetailDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  @IsArray()
  orderDetails: CreateOrderDetailDto[];

  // Don't forget to use the class-validator decorators in the DTO properties.
}
