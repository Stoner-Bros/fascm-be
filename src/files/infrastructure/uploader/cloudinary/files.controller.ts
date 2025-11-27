import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileResponseDto } from './dto/file-response.dto';
import { FilesCloudinaryService } from './files.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class FilesCloudinaryController {
  constructor(private readonly filesService: FilesCloudinaryService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileResponseDto> {
    const uploadedFile = await this.filesService.uploadFile(file);
    return new FileResponseDto(uploadedFile);
  }
}
