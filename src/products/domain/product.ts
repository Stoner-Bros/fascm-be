import { Price } from '../../prices/domain/price';
import { Category } from '../../categories/domain/category';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    type: () => [Price],
    nullable: true,
  })
  price?: Price[] | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  image?: string | null;

  @ApiProperty({
    type: () => Category,
    nullable: true,
  })
  category?: Category | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

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
