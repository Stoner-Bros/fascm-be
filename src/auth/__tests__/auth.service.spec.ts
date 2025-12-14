/**
 * @file auth.service.spec.ts
 * @description Comprehensive unit tests for AuthService  
 * @coverage Critical functions with Normal, Boundary, and Abnormal cases
 */

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  UnprocessableEntityException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { SessionService } from '../../session/session.service';
import { MailService } from '../../mail/mail.service';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from '../dto/auth-register-login.dto';
import { RoleEnum } from '../../roles/roles.enum';
import { StatusEnum } from '../../statuses/statuses.enum';
import { AuthProvidersEnum } from '../auth-providers.enum';

// Mock bcrypt
jest.mock('bcryptjs');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;
  let sessionService: jest.Mocked<SessionService>;
  let mailService: jest.Mocked<MailService>;
  let configService: jest.Mocked<ConfigService>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: '$2a$10$hashedPassword',
    firstName: 'Test',
    lastName: 'User',
    provider: AuthProvidersEnum.email,
    role: { id: RoleEnum.user },
    status: { id: StatusEnum.active },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSession = {
    id: 1,
    user: mockUser,
    hash: 'sessionHash123',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            findBySocialIdAndProvider: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: SessionService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
            deleteByUserId: jest.fn(),
            deleteByUserIdWithExclude: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            userSignUp: jest.fn(),
            forgotPassword: jest.fn(),
            confirmNewEmail: jest.fn(),
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

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
    sessionService = module.get(SessionService);
    mailService = module.get(MailService);
    configService = module.get(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateLogin', () => {
    const loginDto: AuthEmailLoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    describe('Normal Cases', () => {
      it('UTC_validateLogin_01: should return LoginResponseDto with tokens when credentials are valid', async () => {
        usersService.findByEmail.mockResolvedValue(mockUser);
        mockedBcrypt.compare.mockResolvedValue(true as never);
        sessionService.create.mockResolvedValue(mockSession);
        jwtService.signAsync
          .mockResolvedValueOnce('access-token')
          .mockResolvedValueOnce('refresh-token');
        configService.getOrThrow.mockReturnValue('1h');

        const result = await service.validateLogin(loginDto);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('refreshToken');
        expect(result).toHaveProperty('user');
        expect(usersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
        expect(mockedBcrypt.compare).toHaveBeenCalledWith(
          loginDto.password,
          mockUser.password,
        );
      });

      it('UTC_validateLogin_02: should create a new session for valid login', async () => {
        usersService.findByEmail.mockResolvedValue(mockUser);
        mockedBcrypt.compare.mockResolvedValue(true as never);
        sessionService.create.mockResolvedValue(mockSession);
        jwtService.signAsync
          .mockResolvedValueOnce('access-token')
          .mockResolvedValueOnce('refresh-token');
        configService.getOrThrow.mockReturnValue('1h');

        await service.validateLogin(loginDto);

        expect(sessionService.create).toHaveBeenCalledWith(
          expect.objectContaining({
            user: mockUser,
            hash: expect.any(String),
          }),
        );
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_validateLogin_03: should handle email with maximum valid length', async () => {
        const longEmail = 'a'.repeat(50) + '@example.com';
        const userWithLongEmail = { ...mockUser, email: longEmail };
        const longEmailDto = { ...loginDto, email: longEmail };

        usersService.findByEmail.mockResolvedValue(userWithLongEmail);
        mockedBcrypt.compare.mockResolvedValue(true as never);
        sessionService.create.mockResolvedValue(mockSession);
        jwtService.signAsync
          .mockResolvedValueOnce('access-token')
          .mockResolvedValueOnce('refresh-token');
        configService.getOrThrow.mockReturnValue('1h');

        const result = await service.validateLogin(longEmailDto);

        expect(result).toBeDefined();
        expect(usersService.findByEmail).toHaveBeenCalledWith(longEmail);
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_validateLogin_04: should throw UnprocessableEntityException when user not found', async () => {
        usersService.findByEmail.mockResolvedValue(null);

        await expect(service.validateLogin(loginDto)).rejects.toThrow(
          UnprocessableEntityException,
        );
      });

      it('UTC_validateLogin_05: should throw UnprocessableEntityException when user status is inactive', async () => {
        const inactiveUser = {
          ...mockUser,
          status: { id: StatusEnum.inactive },
        };
        usersService.findByEmail.mockResolvedValue(inactiveUser);

        await expect(service.validateLogin(loginDto)).rejects.toThrow(
          UnprocessableEntityException,
        );
      });

      it('UTC_validateLogin_06: should throw UnprocessableEntityException when user provider is not email', async () => {
        const googleUser = { ...mockUser, provider: AuthProvidersEnum.google };
        usersService.findByEmail.mockResolvedValue(googleUser);

        await expect(service.validateLogin(loginDto)).rejects.toThrow(
          UnprocessableEntityException,
        );
      });

      it('UTC_validateLogin_07: should throw UnprocessableEntityException when password is incorrect', async () => {
        usersService.findByEmail.mockResolvedValue(mockUser);
        mockedBcrypt.compare.mockResolvedValue(false as never);

        await expect(service.validateLogin(loginDto)).rejects.toThrow(
          UnprocessableEntityException,
        );
      });
    });
  });

  describe('validateSocialLogin', () => {
    const socialData = {
      id: 'google-123',
      email: 'social@example.com',
      firstName: 'Social',
      lastName: 'User',
    };

    describe('Normal Cases', () => {
      it('UTC_validateSocialLogin_01: should return LoginResponseDto for existing user with social ID', async () => {
        usersService.findBySocialIdAndProvider.mockResolvedValue(mockUser);
        usersService.update.mockResolvedValue(mockUser);
        sessionService.create.mockResolvedValue(mockSession);
        jwtService.signAsync
          .mockResolvedValueOnce('access-token')
          .mockResolvedValueOnce('refresh-token');
        configService.getOrThrow.mockReturnValue('1h');

        const result = await service.validateSocialLogin('google', socialData);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('token');
        expect(usersService.findBySocialIdAndProvider).toHaveBeenCalledWith({
          socialId: socialData.id,
          provider: 'google',
        });
      });

      it('UTC_validateSocialLogin_02: should create new user when social ID not found', async () => {
        usersService.findByEmail.mockResolvedValue(null);
        usersService.findBySocialIdAndProvider.mockResolvedValue(null);
        usersService.create.mockResolvedValue(mockUser);
        usersService.findById.mockResolvedValue(mockUser);
        sessionService.create.mockResolvedValue(mockSession);
        jwtService.signAsync
          .mockResolvedValueOnce('access-token')
          .mockResolvedValueOnce('refresh-token');
        configService.getOrThrow.mockReturnValue('1h');

        const result = await service.validateSocialLogin('google', socialData);

        expect(result).toBeDefined();
        expect(usersService.create).toHaveBeenCalledWith(
          expect.objectContaining({
            email: socialData.email.toLowerCase(),
            socialId: socialData.id,
            provider: 'google',
          }),
        );
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_validateSocialLogin_03: should throw UnprocessableEntityException when social ID is null', async () => {
        const socialDataNoId = { ...socialData, id: null };
        usersService.findByEmail.mockResolvedValue(null);
        usersService.findBySocialIdAndProvider.mockResolvedValue(null);

        await expect(
          service.validateSocialLogin('google', socialDataNoId),
        ).rejects.toThrow(UnprocessableEntityException);
      });
    });
  });

  describe('register', () => {
    const registerDto: AuthRegisterLoginDto = {
      email: 'new@example.com',
      password: 'password123',
      firstName: 'New',
      lastName: 'User',
    };

    describe('Normal Cases', () => {
      it('UTC_register_01: should create user and send confirmation email', async () => {
        usersService.create.mockResolvedValue(mockUser);
        jwtService.signAsync.mockResolvedValue('confirmation-hash');
        configService.getOrThrow.mockReturnValue('24h');
        mailService.userSignUp.mockResolvedValue(undefined);

        const result = await service.register(registerDto, RoleEnum.user);

        expect(result).toBeDefined();
        expect(usersService.create).toHaveBeenCalledWith(
          expect.objectContaining({
            email: registerDto.email,
            role: { id: RoleEnum.user },
            status: { id: StatusEnum.inactive },
          }),
        );
        expect(mailService.userSignUp).toHaveBeenCalled();
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_register_02: should throw error when user creation fails', async () => {
        usersService.create.mockRejectedValue(
          new Error('User creation failed'),
        );

        await expect(
          service.register(registerDto, RoleEnum.user),
        ).rejects.toThrow('User creation failed');
      });
    });
  });

  describe('confirmEmail', () => {
    const hash = 'valid-hash';

    describe('Normal Cases', () => {
      it('UTC_confirmEmail_01: should activate user and return login response', async () => {
        const inactiveUser = {
          ...mockUser,
          status: { id: StatusEnum.inactive },
        };
        jwtService.verifyAsync.mockResolvedValue({
          confirmEmailUserId: mockUser.id,
        });
        usersService.findById.mockResolvedValue(inactiveUser);
        usersService.update.mockResolvedValue(mockUser);
        sessionService.create.mockResolvedValue(mockSession);
        jwtService.signAsync
          .mockResolvedValueOnce('access-token')
          .mockResolvedValueOnce('refresh-token');
        configService.getOrThrow.mockReturnValue('1h');

        const result = await service.confirmEmail(hash);

        expect(result).toBeDefined();
        expect(usersService.update).toHaveBeenCalledWith(
          mockUser.id,
          expect.objectContaining({
            status: { id: StatusEnum.active },
          }),
        );
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_confirmEmail_02: should throw UnprocessableEntityException for invalid hash', async () => {
        jwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

        await expect(service.confirmEmail('invalid-hash')).rejects.toThrow(
          UnprocessableEntityException,
        );
      });

      it('UTC_confirmEmail_03: should throw NotFoundException when user not found', async () => {
        jwtService.verifyAsync.mockResolvedValue({
          confirmEmailUserId: 999,
        });
        usersService.findById.mockResolvedValue(null);

        await expect(service.confirmEmail(hash)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });

  describe('forgotPassword', () => {
    const email = 'test@example.com';

    describe('Normal Cases', () => {
      it('UTC_forgotPassword_01: should send password reset email', async () => {
        usersService.findByEmail.mockResolvedValue(mockUser);
        jwtService.signAsync.mockResolvedValue('reset-hash');
        configService.getOrThrow.mockReturnValue('1h');
        mailService.forgotPassword.mockResolvedValue(undefined);

        await service.forgotPassword(email);

        expect(usersService.findByEmail).toHaveBeenCalledWith(email);
        expect(mailService.forgotPassword).toHaveBeenCalledWith(
          expect.objectContaining({
            to: email,
            data: expect.objectContaining({
              hash: 'reset-hash',
            }),
          }),
        );
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_forgotPassword_02: should throw UnprocessableEntityException when user not found', async () => {
        usersService.findByEmail.mockResolvedValue(null);

        await expect(service.forgotPassword(email)).rejects.toThrow(
          UnprocessableEntityException,
        );
      });
    });
  });

  describe('resetPassword', () => {
    const hash = 'valid-reset-hash';
    const newPassword = 'newPassword123';

    describe('Normal Cases', () => {
      it('UTC_resetPassword_01: should reset password and delete all sessions', async () => {
        jwtService.verifyAsync.mockResolvedValue({
          forgotUserId: mockUser.id,
        });
        usersService.findById.mockResolvedValue(mockUser);
        usersService.update.mockResolvedValue(mockUser);
        sessionService.deleteByUserId.mockResolvedValue(undefined);

        await service.resetPassword(hash, newPassword);

        expect(usersService.update).toHaveBeenCalledWith(
          mockUser.id,
          expect.objectContaining({
            password: newPassword,
          }),
        );
        expect(sessionService.deleteByUserId).toHaveBeenCalledWith({
          userId: mockUser.id,
        });
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_resetPassword_02: should throw UnprocessableEntityException for invalid hash', async () => {
        jwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

        await expect(
          service.resetPassword('invalid-hash', newPassword),
        ).rejects.toThrow(UnprocessableEntityException);
      });

      it('UTC_resetPassword_03: should throw UnprocessableEntityException when user not found', async () => {
        jwtService.verifyAsync.mockResolvedValue({
          forgotUserId: 999,
        });
        usersService.findById.mockResolvedValue(null);

        await expect(service.resetPassword(hash, newPassword)).rejects.toThrow(
          UnprocessableEntityException,
        );
      });
    });
  });

  describe('refreshToken', () => {
    const refreshData = {
      sessionId: 1,
      hash: 'sessionHash123',
    };

    describe('Normal Cases', () => {
      it('UTC_refreshToken_01: should return new tokens for valid refresh token', async () => {
        sessionService.findById.mockResolvedValue(mockSession);
        usersService.findById.mockResolvedValue(mockUser);
        sessionService.update.mockResolvedValue(mockSession);
        jwtService.signAsync
          .mockResolvedValueOnce('new-access-token')
          .mockResolvedValueOnce('new-refresh-token');
        configService.getOrThrow.mockReturnValue('1h');

        const result = await service.refreshToken(refreshData);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('refreshToken');
        expect(sessionService.update).toHaveBeenCalled();
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_refreshToken_02: should throw UnauthorizedException when session not found', async () => {
        sessionService.findById.mockResolvedValue(null);

        await expect(service.refreshToken(refreshData)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it('UTC_refreshToken_03: should throw UnauthorizedException when session is deleted', async () => {
        const deletedSession = { ...mockSession, deletedAt: new Date() };
        sessionService.findById.mockResolvedValue(deletedSession);

        await expect(service.refreshToken(refreshData)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it('UTC_refreshToken_04: should throw UnauthorizedException when hash does not match', async () => {
        sessionService.findById.mockResolvedValue(mockSession);

        await expect(
          service.refreshToken({ ...refreshData, hash: 'wrong-hash' }),
        ).rejects.toThrow(UnauthorizedException);
      });
    });
  });
});
