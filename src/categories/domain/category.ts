import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  englishName?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  vietnameseName?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
