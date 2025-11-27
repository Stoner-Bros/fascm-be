import { ApiProperty } from '@nestjs/swagger';
import { FileType as File } from '../../../../domain/file';

export class FileResponseDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  path: string;

  constructor(file: File) {
    this.id = file.id;
    this.path = file.path;
  }
}
