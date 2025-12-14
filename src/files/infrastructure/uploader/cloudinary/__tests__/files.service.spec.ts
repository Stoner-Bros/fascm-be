/**
 * @file files.service.spec.ts
 * @description Comprehensive unit tests for FilesCloudinaryService
 * @coverage uploadFile() with Normal, Boundary, and Abnormal cases
 */

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesCloudinaryService } from '../files.service';
import { FileRepository } from '../../../../infrastructure/persistence/file.repository';
import { v2 as cloudinary } from 'cloudinary';

// Mock cloudinary
jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn(),
    },
  },
}));

describe('FilesCloudinaryService', () => {
  let service: FilesCloudinaryService;
  let fileRepository: jest.Mocked<FileRepository>;
  let configService: jest.Mocked<ConfigService>;

  const mockFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: Buffer.from('test file content'),
    size: 1024,
    stream: null as any,
    destination: '',
    filename: 'test.jpg',
    path: '',
  };

  const mockFileEntity = {
    id: '1',
    path: 'https://res.cloudinary.com/test/image/upload/v123/fascm/test.jpg',
  };

  const mockUploadResult = {
    secure_url: 'https://res.cloudinary.com/test/image/upload/v123/fascm/test.jpg',
    public_id: 'fascm/test',
    resource_type: 'image',
  };

  const MAX_FILE_SIZE = 5242880; // 5MB
  const TEST_CLOUD_CONFIG = {
    cloudName: 'test-cloud',
    apiKey: 'test-api-key',
    apiSecret: 'test-api-secret',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesCloudinaryService,
        {
          provide: FileRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
            getOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilesCloudinaryService>(FilesCloudinaryService);
    fileRepository = module.get(FileRepository);
    configService = module.get(ConfigService);

    // Setup default config mocks
    configService.getOrThrow.mockImplementation((key: string) => {
      const configs = {
        'file.cloudinaryCloudName': TEST_CLOUD_CONFIG.cloudName,
        'file.cloudinaryApiKey': TEST_CLOUD_CONFIG.apiKey,
        'file.cloudinaryApiSecret': TEST_CLOUD_CONFIG.apiSecret,
        'file.maxFileSize': MAX_FILE_SIZE,
      };
      return configs[key];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    describe('Normal Cases', () => {
      it('UTC_uploadFile_01: should upload file successfully and return file entity', async () => {
        // Arrange
        (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.uploadFile(mockFile);

        // Assert
        expect(result).toBeDefined();
        expect(result.path).toBe(mockUploadResult.secure_url);
        expect(cloudinary.uploader.upload).toHaveBeenCalled();
        expect(fileRepository.create).toHaveBeenCalledWith({
          path: mockUploadResult.secure_url,
        });
      });

      it('UTC_uploadFile_02: should convert file buffer to base64 for cloudinary upload', async () => {
        // Arrange
        (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        await service.uploadFile(mockFile);

        // Assert
        expect(cloudinary.uploader.upload).toHaveBeenCalledWith(
          expect.stringContaining('data:image/jpeg;base64,'),
          expect.objectContaining({
            folder: 'fascm',
            use_filename: true,
            unique_filename: true,
            overwrite: false,
            resource_type: 'auto',
          }),
        );
      });

      it('UTC_uploadFile_03: should upload file with different mime types', async () => {
        // Arrange
        const pdfFile = { ...mockFile, mimetype: 'application/pdf', originalname: 'test.pdf' };
        (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.uploadFile(pdfFile);

        // Assert
        expect(result).toBeDefined();
        expect(cloudinary.uploader.upload).toHaveBeenCalledWith(
          expect.stringContaining('data:application/pdf;base64,'),
          expect.any(Object),
        );
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_uploadFile_04: should handle file at maximum allowed size', async () => {
        // Arrange
        const maxSizeFile = { ...mockFile, size: MAX_FILE_SIZE };
        (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.uploadFile(maxSizeFile);

        // Assert
        expect(result).toBeDefined();
      });

      it('UTC_uploadFile_05: should handle file with minimum size (1 byte)', async () => {
        // Arrange
        const minSizeFile = { ...mockFile, size: 1, buffer: Buffer.from('a') };
        (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.uploadFile(minSizeFile);

        // Assert
        expect(result).toBeDefined();
      });

      it('UTC_uploadFile_06: should handle file with special characters in filename', async () => {
        // Arrange
        const specialNameFile = { ...mockFile, originalname: 'tëst-fîlé (1) [2024].jpg' };
        (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.uploadFile(specialNameFile);

        // Assert
        expect(result).toBeDefined();
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_uploadFile_07: should throw BadRequestException when file is null', async () => {
        // Act & Assert
        await expect(service.uploadFile(null as any)).rejects.toThrow(
          BadRequestException,
        );
        await expect(service.uploadFile(null as any)).rejects.toThrow(
          'File is required',
        );
      });

      it('UTC_uploadFile_08: should throw BadRequestException when file is undefined', async () => {
        // Act & Assert
        await expect(service.uploadFile(undefined as any)).rejects.toThrow(
          BadRequestException,
        );
        await expect(service.uploadFile(undefined as any)).rejects.toThrow(
          'File is required',
        );
      });

      it('UTC_uploadFile_09: should throw BadRequestException when file size exceeds maximum', async () => {
        // Arrange
        const oversizedFile = { ...mockFile, size: 6000000 }; // 6MB

        // Act & Assert
        await expect(service.uploadFile(oversizedFile)).rejects.toThrow(
          BadRequestException,
        );
        await expect(service.uploadFile(oversizedFile)).rejects.toThrow(
          /File size exceeds maximum allowed size/,
        );
      });

      it('UTC_uploadFile_10: should throw BadRequestException when cloudinary upload fails', async () => {
        // Arrange
        (cloudinary.uploader.upload as jest.Mock).mockRejectedValue(
          new Error('Cloudinary API error'),
        );

        // Act & Assert
        await expect(service.uploadFile(mockFile)).rejects.toThrow(
          BadRequestException,
        );
        await expect(service.uploadFile(mockFile)).rejects.toThrow(
          /Failed to upload file to Cloudinary/,
        );
      });

      it('UTC_uploadFile_11: should throw error when file repository fails', async () => {
        // Arrange
        (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResult);
        fileRepository.create.mockRejectedValue(new Error('Database error'));

        // Act & Assert
        await expect(service.uploadFile(mockFile)).rejects.toThrow('Database error');
      });

      it('UTC_uploadFile_12: should handle cloudinary network timeout', async () => {
        // Arrange
        (cloudinary.uploader.upload as jest.Mock).mockRejectedValue(
          new Error('Network timeout'),
        );

        // Act & Assert
        await expect(service.uploadFile(mockFile)).rejects.toThrow(
          BadRequestException,
        );
      });
    });
  });
});
