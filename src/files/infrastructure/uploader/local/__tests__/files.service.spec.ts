/**
 * @file files.service.spec.ts
 * @description Comprehensive unit tests for FilesLocalService
 * @coverage create() with Normal, Boundary, and Abnormal cases
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesLocalService } from '../files.service';
import { FileRepository } from '../../../persistence/file.repository';

describe('FilesLocalService', () => {
  let service: FilesLocalService;
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
    destination: 'uploads/',
    filename: 'test-123.jpg',
    path: 'uploads/test-123.jpg',
  };

  const mockFileEntity = {
    id: '1',
    path: '/api/v1/uploads/test-123.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesLocalService,
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

    service = module.get<FilesLocalService>(FilesLocalService);
    fileRepository = module.get(FileRepository);
    configService = module.get(ConfigService);

    // Setup default config mocks
    configService.get.mockReturnValue('api');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('Normal Cases', () => {
      it('UTC_create_01: should create file entity with correct path', async () => {
        // Arrange
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.create(mockFile);

        // Assert
        expect(result).toBeDefined();
        expect(result.file).toBeDefined();
        expect(result.file.path).toContain('/api/v1/');
        expect(fileRepository.create).toHaveBeenCalledWith({
          path: expect.stringContaining('/api/v1/'),
        });
      });

      it('UTC_create_02: should use API prefix from config service', async () => {
        // Arrange
        configService.get.mockReturnValue('custom-api');
        fileRepository.create.mockResolvedValue({
          ...mockFileEntity,
          path: '/custom-api/v1/uploads/test-123.jpg',
        });

        // Act
        const result = await service.create(mockFile);

        // Assert
        expect(result.file.path).toContain('/custom-api/v1/');
        expect(configService.get).toHaveBeenCalledWith('app.apiPrefix', {
          infer: true,
        });
      });

      it('UTC_create_03: should handle different file types', async () => {
        // Arrange
        const pdfFile = { ...mockFile, mimetype: 'application/pdf', path: 'uploads/test.pdf' };
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.create(pdfFile);

        // Assert
        expect(result).toBeDefined();
        expect(result.file).toBeDefined();
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_create_04: should handle file path with special characters', async () => {
        // Arrange
        const specialPathFile = { ...mockFile, path: 'uploads/tëst-fîlé (1) [2024].jpg' };
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.create(specialPathFile);

        // Assert
        expect(result).toBeDefined();
        expect(result.file).toBeDefined();
      });

      it('UTC_create_05: should handle file path with deep directory structure', async () => {
        // Arrange
        const deepPathFile = { ...mockFile, path: 'uploads/2024/01/15/subfolder/test.jpg' };
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.create(deepPathFile);

        // Assert
        expect(result).toBeDefined();
        expect(fileRepository.create).toHaveBeenCalledWith({
          path: expect.stringContaining('uploads/2024/01/15/subfolder/test.jpg'),
        });
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_create_06: should throw UnprocessableEntityException when file is null', async () => {
        // Act & Assert
        await expect(service.create(null as any)).rejects.toThrow(
          UnprocessableEntityException,
        );
        await expect(service.create(null as any)).rejects.toThrow(
          expect.objectContaining({
            message: expect.objectContaining({
              errors: { file: 'selectFile' },
            }),
          }),
        );
      });

      it('UTC_create_07: should throw UnprocessableEntityException when file is undefined', async () => {
        // Act & Assert
        await expect(service.create(undefined as any)).rejects.toThrow(
          UnprocessableEntityException,
        );
        await expect(service.create(undefined as any)).rejects.toThrow(
          expect.objectContaining({
            message: expect.objectContaining({
              errors: { file: 'selectFile' },
            }),
          }),
        );
      });

      it('UTC_create_08: should handle database error gracefully', async () => {
        // Arrange
        fileRepository.create.mockRejectedValue(new Error('Database connection failed'));

        // Act & Assert
        await expect(service.create(mockFile)).rejects.toThrow(
          'Database connection failed',
        );
      });

      it('UTC_create_09: should handle config service error', async () => {
        // Arrange
        configService.get.mockImplementation(() => {
          throw new Error('Config not found');
        });

        // Act & Assert
        await expect(service.create(mockFile)).rejects.toThrow('Config not found');
      });

      it('UTC_create_10: should handle empty file path', async () => {
        // Arrange
        const emptyPathFile = { ...mockFile, path: '' };
        fileRepository.create.mockResolvedValue(mockFileEntity);

        // Act
        const result = await service.create(emptyPathFile);

        // Assert
        expect(result).toBeDefined();
        expect(result.file.path).toContain('/api/v1/');
      });
    });
  });
});
