import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../../../config/config.type';
import { FileType as File } from '../../../domain/file';
import { FileRepository } from '../../../infrastructure/persistence/file.repository';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class FilesCloudinaryService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly fileRepository: FileRepository,
  ) {
    // Configure cloudinary
    cloudinary.config({
      cloud_name: this.configService.getOrThrow('file.cloudinaryCloudName', {
        infer: true,
      }),
      api_key: this.configService.getOrThrow('file.cloudinaryApiKey', {
        infer: true,
      }),
      api_secret: this.configService.getOrThrow('file.cloudinaryApiSecret', {
        infer: true,
      }),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<File> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const maxFileSize = this.configService.getOrThrow('file.maxFileSize', {
      infer: true,
    });

    if (file.size > maxFileSize) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size of ${maxFileSize} bytes`,
      );
    }

    try {
      // Convert buffer to base64 for cloudinary upload
      const base64File = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

      const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
        base64File,
        {
          folder: 'fascm', // Optional: organize files in folders
          use_filename: true,
          unique_filename: true,
          overwrite: false,
          resource_type: 'auto', // Automatically detect file type
        },
      );

      const fileEntity = {
        path: uploadResult.secure_url,
      };

      return this.fileRepository.create(fileEntity);
    } catch (error) {
      throw new BadRequestException(
        `Failed to upload file to Cloudinary: ${error.message}`,
      );
    }
  }
}
