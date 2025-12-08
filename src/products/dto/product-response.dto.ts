import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  image?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  categoryName?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  name?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;
}
