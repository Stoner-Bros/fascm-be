import { Category } from '../../categories/domain/category';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    type: () => Category,
    nullable: true,
  })
  categoryId?: Category | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  storageHumidityRange?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  storageTemperatureRange?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  name?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
