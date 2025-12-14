/**
 * @file users.service.spec.ts
 * @description Comprehensive unit tests for UsersService
 * @coverage create() and update() functions with Normal, Boundary, and Abnormal cases
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users.service';
import { UserRepository } from '../infrastructure/persistence/user.repository';
import { FilesService } from '../../files/files.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RoleEnum } from '../../roles/roles.enum';
import { StatusEnum } from '../../statuses/statuses.enum';
import { AuthProvidersEnum } from '../../auth/auth-providers.enum';

// Mock bcrypt
jest.mock('bcryptjs');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<UserRepository>;
  let filesService: jest.Mocked<FilesService>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: '$2a$10$hashedPassword',
    firstName: 'Test',
    lastName: 'User',
    provider: AuthProvidersEnum.email,
    role: { id: RoleEnum.user },
    status: { id: StatusEnum.active },
    photo: null,
    socialId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockFile = {
    id: '1',
    path: '/uploads/test.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: FilesService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(UserRepository);
    filesService = module.get(FilesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      email: 'newuser@example.com',
      password: 'password123',
      firstName: 'New',
      lastName: 'User',
      role: { id: RoleEnum.user },
      status: { id: StatusEnum.active },
    };

    describe('Normal Cases', () => {
      it('UTC_create_01: should create user with valid data and hashed password', async () => {
        // Arrange
        userRepository.findByEmail.mockResolvedValue(null);
        mockedBcrypt.genSalt.mockResolvedValue('salt' as never);
        mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);
        userRepository.create.mockResolvedValue(mockUser);

        // Act
        const result = await service.create(createUserDto);

        // Assert
        expect(result).toBeDefined();
        expect(userRepository.findByEmail).toHaveBeenCalledWith(
          createUserDto.email,
        );
        expect(mockedBcrypt.genSalt).toHaveBeenCalled();
        expect(mockedBcrypt.hash).toHaveBeenCalledWith(
          createUserDto.password,
          'salt',
        );
        expect(userRepository.create).toHaveBeenCalled();
      });

      it('UTC_create_02: should create user with photo when photo ID is provided', async () => {
        // Arrange
        const createDtoWithPhoto = { ...createUserDto, photo: { id: '1' } };
        userRepository.findByEmail.mockResolvedValue(null);
        filesService.findById.mockResolvedValue(mockFile);
        mockedBcrypt.genSalt.mockResolvedValue('salt' as never);
        mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);
        userRepository.create.mockResolvedValue(mockUser);

        // Act
        const result = await service.create(createDtoWithPhoto);

        // Assert
        expect(result).toBeDefined();
        expect(filesService.findById).toHaveBeenCalledWith('1');
        expect(userRepository.create).toHaveBeenCalledWith(
          expect.objectContaining({
            photo: mockFile,
          }),
        );
      });

      it('UTC_create_03: should create user without password for social providers', async () => {
        // Arrange
        const socialUserDto = {
          ...createUserDto,
          password: undefined,
          provider: AuthProvidersEnum.google,
          socialId: 'google-123',
        };
        userRepository.findByEmail.mockResolvedValue(null);
        userRepository.create.mockResolvedValue(mockUser);

        // Act
        const result = await service.create(socialUserDto);

        // Assert
        expect(result).toBeDefined();
        expect(mockedBcrypt.genSalt).not.toHaveBeenCalled();
        expect(userRepository.create).toHaveBeenCalled();
      });

      it('UTC_create_04: should create user with null photo when photo is explicitly null', async () => {
        // Arrange
        const createDtoWithNullPhoto = { ...createUserDto, photo: null };
        userRepository.findByEmail.mockResolvedValue(null);
        mockedBcrypt.genSalt.mockResolvedValue('salt' as never);
        mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);
        userRepository.create.mockResolvedValue(mockUser);

        // Act
        const result = await service.create(createDtoWithNullPhoto);

        // Assert
        expect(result).toBeDefined();
        expect(userRepository.create).toHaveBeenCalledWith(
          expect.objectContaining({
            photo: null,
          }),
        );
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_create_05: should handle email with maximum valid length', async () => {
        // Arrange
        const longEmail = 'a'.repeat(50) + '@example.com';
        const dtoWithLongEmail = { ...createUserDto, email: longEmail };
        userRepository.findByEmail.mockResolvedValue(null);
        mockedBcrypt.genSalt.mockResolvedValue('salt' as never);
        mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);
        userRepository.create.mockResolvedValue(mockUser);

        // Act
        const result = await service.create(dtoWithLongEmail);

        // Assert
        expect(result).toBeDefined();
        expect(userRepository.findByEmail).toHaveBeenCalledWith(longEmail);
      });

      it('UTC_create_06: should handle minimum password length', async () => {
        // Arrange
        const dtoWithMinPassword = { ...createUserDto, password: '123456' };
        userRepository.findByEmail.mockResolvedValue(null);
        mockedBcrypt.genSalt.mockResolvedValue('salt' as never);
        mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);
        userRepository.create.mockResolvedValue(mockUser);

        // Act
        const result = await service.create(dtoWithMinPassword);

        // Assert
        expect(result).toBeDefined();
      });

      it('UTC_create_07: should handle user with all possible roles', async () => {
        // Arrange
        const roles = Object.values(RoleEnum).filter((v) => typeof v === 'number');
        userRepository.findByEmail.mockResolvedValue(null);
        mockedBcrypt.genSalt.mockResolvedValue('salt' as never);
        mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);
        userRepository.create.mockResolvedValue(mockUser);

        // Act & Assert
        for (const roleId of roles) {
          const dtoWithRole = { ...createUserDto, role: { id: roleId as RoleEnum } };
          const result = await service.create(dtoWithRole);
          expect(result).toBeDefined();
        }
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_create_08: should throw UnprocessableEntityException when email already exists', async () => {
        // Arrange
        userRepository.findByEmail.mockResolvedValue(mockUser);

        // Act & Assert
        await expect(service.create(createUserDto)).rejects.toThrow(
          UnprocessableEntityException,
        );
        await expect(service.create(createUserDto)).rejects.toThrow(
          expect.objectContaining({
            message: expect.objectContaining({
              errors: { email: 'emailAlreadyExists' },
            }),
          }),
        );
      });

      it('UTC_create_09: should throw UnprocessableEntityException when photo does not exist', async () => {
        // Arrange
        const createDtoWithInvalidPhoto = { ...createUserDto, photo: { id: '999' } };
        userRepository.findByEmail.mockResolvedValue(null);
        filesService.findById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.create(createDtoWithInvalidPhoto)).rejects.toThrow(
          UnprocessableEntityException,
        );
        await expect(service.create(createDtoWithInvalidPhoto)).rejects.toThrow(
          expect.objectContaining({
            message: expect.objectContaining({
              errors: { photo: 'imageNotExists' },
            }),
          }),
        );
      });

      it('UTC_create_10: should throw UnprocessableEntityException when role does not exist', async () => {
        // Arrange
        const invalidRoleDto = { ...createUserDto, role: { id: 999 as RoleEnum } };
        userRepository.findByEmail.mockResolvedValue(null);

        // Act & Assert
        await expect(service.create(invalidRoleDto)).rejects.toThrow(
          UnprocessableEntityException,
        );
        await expect(service.create(invalidRoleDto)).rejects.toThrow(
          expect.objectContaining({
            message: expect.objectContaining({
              errors: { role: 'roleNotExists' },
            }),
          }),
        );
      });

      it('UTC_create_11: should throw UnprocessableEntityException when status does not exist', async () => {
        // Arrange
        const invalidStatusDto = { ...createUserDto, status: { id: 999 as StatusEnum } };
        userRepository.findByEmail.mockResolvedValue(null);

        // Act & Assert
        await expect(service.create(invalidStatusDto)).rejects.toThrow(
          UnprocessableEntityException,
        );
        await expect(service.create(invalidStatusDto)).rejects.toThrow(
          expect.objectContaining({
            message: expect.objectContaining({
              errors: { status: 'statusNotExists' },
            }),
          }),
        );
      });

      it('UTC_create_12: should handle database error gracefully', async () => {
        // Arrange
        userRepository.findByEmail.mockRejectedValue(
          new Error('Database connection failed'),
        );

        // Act & Assert
        await expect(service.create(createUserDto)).rejects.toThrow(
          'Database connection failed',
        );
      });

      it('UTC_create_13: should handle bcrypt hashing failure', async () => {
        // Arrange
        userRepository.findByEmail.mockResolvedValue(null);
        mockedBcrypt.genSalt.mockRejectedValue(new Error('Bcrypt error'));

        // Act & Assert
        await expect(service.create(createUserDto)).rejects.toThrow(
          'Bcrypt error',
        );
      });

      it('UTC_create_14: should handle file service error', async () => {
        // Arrange
        const createDtoWithPhoto = { ...createUserDto, photo: { id: '1' } };
        userRepository.findByEmail.mockResolvedValue(null);
        filesService.findById.mockRejectedValue(new Error('File service error'));

        // Act & Assert
        await expect(service.create(createDtoWithPhoto)).rejects.toThrow(
          'File service error',
        );
      });
    });
  });

  describe('update', () => {
    const updateUserDto: UpdateUserDto = {
      firstName: 'Updated',
      lastName: 'Name',
    };

    describe('Normal Cases', () => {
      it('UTC_update_01: should update user with valid data', async () => {
        // Arrange
        userRepository.findById.mockResolvedValue(mockUser);
        userRepository.findByEmail.mockResolvedValue(null);
        userRepository.update.mockResolvedValue({ ...mockUser, ...updateUserDto });

        // Act
        const result = await service.update(mockUser.id, updateUserDto);

        // Assert
        expect(result).toBeDefined();
        expect(userRepository.update).toHaveBeenCalledWith(
          mockUser.id,
          expect.objectContaining({
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
          }),
        );
      });

      it('UTC_update_02: should update password and hash it when password is new', async () => {
        // Arrange
        const updateWithPassword = { ...updateUserDto, password: 'newPassword123' };
        userRepository.findById.mockResolvedValue(mockUser);
        mockedBcrypt.genSalt.mockResolvedValue('salt' as never);
        mockedBcrypt.hash.mockResolvedValue('newHashedPassword' as never);
        userRepository.update.mockResolvedValue(mockUser);

        // Act
        const result = await service.update(mockUser.id, updateWithPassword);

        // Assert
        expect(result).toBeDefined();
        expect(mockedBcrypt.genSalt).toHaveBeenCalled();
        expect(mockedBcrypt.hash).toHaveBeenCalled();
      });

      it('UTC_update_03: should not rehash password if it is the same', async () => {
        // Arrange
        const updateWithSamePassword = { ...updateUserDto, password: mockUser.password };
        userRepository.findById.mockResolvedValue(mockUser);
        userRepository.update.mockResolvedValue(mockUser);

        // Act
        const result = await service.update(mockUser.id, updateWithSamePassword);

        // Assert
        expect(result).toBeDefined();
        expect(mockedBcrypt.genSalt).not.toHaveBeenCalled();
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_update_04: should handle updating photo to null', async () => {
        // Arrange
        const updateWithNullPhoto = { ...updateUserDto, photo: null };
        userRepository.findById.mockResolvedValue(mockUser);
        userRepository.update.mockResolvedValue(mockUser);

        // Act
        const result = await service.update(mockUser.id, updateWithNullPhoto);

        // Assert
        expect(result).toBeDefined();
        expect(userRepository.update).toHaveBeenCalledWith(
          mockUser.id,
          expect.objectContaining({
            photo: null,
          }),
        );
      });

      it('UTC_update_05: should handle updating email to null', async () => {
        // Arrange
        const updateWithNullEmail = { ...updateUserDto, email: null };
        userRepository.update.mockResolvedValue(mockUser);

        // Act
        const result = await service.update(mockUser.id, updateWithNullEmail);

        // Assert
        expect(result).toBeDefined();
        expect(userRepository.update).toHaveBeenCalledWith(
          mockUser.id,
          expect.objectContaining({
            email: null,
          }),
        );
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_update_06: should throw UnprocessableEntityException when email already exists for another user', async () => {
        // Arrange
        const updateWithExistingEmail = { ...updateUserDto, email: 'existing@example.com' };
        const otherUser = { ...mockUser, id: 2 };
        userRepository.findByEmail.mockResolvedValue(otherUser);

        // Act & Assert
        await expect(
          service.update(mockUser.id, updateWithExistingEmail),
        ).rejects.toThrow(UnprocessableEntityException);
        await expect(
          service.update(mockUser.id, updateWithExistingEmail),
        ).rejects.toThrow(
          expect.objectContaining({
            message: expect.objectContaining({
              errors: { email: 'emailAlreadyExists' },
            }),
          }),
        );
      });

      it('UTC_update_07: should throw UnprocessableEntityException when photo does not exist', async () => {
        // Arrange
        const updateWithInvalidPhoto = { ...updateUserDto, photo: { id: '999' } };
        filesService.findById.mockResolvedValue(null);

        // Act & Assert
        await expect(
          service.update(mockUser.id, updateWithInvalidPhoto),
        ).rejects.toThrow(UnprocessableEntityException);
        await expect(
          service.update(mockUser.id, updateWithInvalidPhoto),
        ).rejects.toThrow(
          expect.objectContaining({
            message: expect.objectContaining({
              errors: { photo: 'imageNotExists' },
            }),
          }),
        );
      });
    });
  });
});
