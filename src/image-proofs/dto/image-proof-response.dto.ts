import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../../files/domain/file';

export class ImageProofResponse {
  @ApiProperty({
    type: () => FileType,
    nullable: true,
  })
  photo?: FileType | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
