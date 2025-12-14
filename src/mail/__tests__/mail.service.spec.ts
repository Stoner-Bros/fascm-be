/**
 * @file mail.service.spec.ts
 * @description Comprehensive unit tests for MailService
 * @coverage getDomain(), userSignUp(), and forgotPassword() with Normal, Boundary, and Abnormal cases
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail.service';
import { MailerService } from '../../mailer/mailer.service';
import { RoleEnum } from '../../roles/roles.enum';
import { I18nContext } from 'nestjs-i18n';

// Mock I18nContext
jest.mock('nestjs-i18n');
const mockedI18n = I18nContext as jest.Mocked<typeof I18nContext>;

describe('MailService', () => {
  let service: MailService;
  let mailerService: jest.Mocked<MailerService>;
  let configService: jest.Mocked<ConfigService>;

  const mockI18nContext = {
    t: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
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

    service = module.get<MailService>(MailService);
    mailerService = module.get(MailerService);
    configService = module.get(ConfigService);

    // Setup I18n mock
    mockedI18n.current = jest.fn().mockReturnValue(mockI18nContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDomain', () => {
    describe('Normal Cases', () => {
      it('UTC_getDomain_01: should return admin domain for admin role', () => {
        // Arrange
        configService.get.mockReturnValue('https://admin.example.com');

        // Act
        const result = service['getDomain'](RoleEnum.admin);

        // Assert
        expect(result).toBe('https://admin.example.com');
        expect(configService.get).toHaveBeenCalledWith('app.adminDomain', {
          infer: true,
        });
      });

      it('UTC_getDomain_02: should return admin domain for manager role', () => {
        // Arrange
        configService.get.mockReturnValue('https://admin.example.com');

        // Act
        const result = service['getDomain'](RoleEnum.manager);

        // Assert
        expect(result).toBe('https://admin.example.com');
      });

      it('UTC_getDomain_03: should return admin domain for staff role', () => {
        // Arrange
        configService.get.mockReturnValue('https://admin.example.com');

        // Act
        const result = service['getDomain'](RoleEnum.staff);

        // Assert
        expect(result).toBe('https://admin.example.com');
      });

      it('UTC_getDomain_04: should return admin domain for delivery_staff role', () => {
        // Arrange
        configService.get.mockReturnValue('https://admin.example.com');

        // Act
        const result = service['getDomain'](RoleEnum.delivery_staff);

        // Assert
        expect(result).toBe('https://admin.example.com');
      });

      it('UTC_getDomain_05: should return frontend domain for consignee role', () => {
        // Arrange
        configService.get.mockReturnValue('https://partner.example.com');

        // Act
        const result = service['getDomain'](RoleEnum.consignee);

        // Assert
        expect(result).toBe('https://partner.example.com');
        expect(configService.get).toHaveBeenCalledWith('app.frontendDomain', {
          infer: true,
        });
      });

      it('UTC_getDomain_06: should return frontend domain for supplier role', () => {
        // Arrange
        configService.get.mockReturnValue('https://partner.example.com');

        // Act
        const result = service['getDomain'](RoleEnum.supplier);

        // Assert
        expect(result).toBe('https://partner.example.com');
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_getDomain_07: should handle role as string number', () => {
        // Arrange
        configService.get.mockReturnValue('https://admin.example.com');

        // Act
        const result = service['getDomain']('1');

        // Assert
        expect(result).toBe('https://admin.example.com');
      });

      it('UTC_getDomain_08: should return empty string when domain is not configured', () => {
        // Arrange
        configService.get.mockReturnValue(null);

        // Act
        const result = service['getDomain'](RoleEnum.admin);

        // Assert
        expect(result).toBe('');
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_getDomain_09: should throw error for user role', () => {
        // Act & Assert
        expect(() => service['getDomain'](RoleEnum.user)).toThrow(
          'Unauthorized role',
        );
      });

      it('UTC_getDomain_10: should throw error for invalid role', () => {
        // Act & Assert
        expect(() => service['getDomain'](999 as RoleEnum)).toThrow(
          'Unauthorized role',
        );
      });

      it('UTC_getDomain_11: should throw error for null role', () => {
        // Act & Assert
        expect(() => service['getDomain'](null as any)).toThrow(
          'Unauthorized role',
        );
      });

      it('UTC_getDomain_12: should throw error for undefined role', () => {
        // Act & Assert
        expect(() => service['getDomain'](undefined as any)).toThrow(
          'Unauthorized role',
        );
      });

      it('UTC_getDomain_13: should throw error for invalid string role', () => {
        // Act & Assert
        expect(() => service['getDomain']('invalid' as any)).toThrow(
          'Unauthorized role',
        );
      });

      it('UTC_getDomain_14: should throw error for negative role number', () => {
        // Act & Assert
        expect(() => service['getDomain'](-1 as any)).toThrow(
          'Unauthorized role',
        );
      });
    });
  });

  describe('userSignUp', () => {
    const mailData = {
      to: 'test@example.com',
      data: {
        hash: 'confirmation-hash-123',
        role: RoleEnum.admin,
      },
    };

    describe('Normal Cases', () => {
      it('UTC_userSignUp_01: should send signup email with correct parameters', async () => {
        // Arrange
        configService.get.mockReturnValue('https://admin.example.com');
        configService.getOrThrow.mockReturnValue('/app');
        mockI18nContext.t.mockResolvedValue('Test String');
        mailerService.sendMail.mockResolvedValue(undefined);

        // Act
        await service.userSignUp(mailData);

        // Assert
        expect(mailerService.sendMail).toHaveBeenCalled();
        expect(mailerService.sendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            to: mailData.to,
            subject: expect.any(String),
          }),
        );
      });

      it('UTC_userSignUp_02: should construct correct confirmation URL', async () => {
        // Arrange
        configService.get
          .mockReturnValueOnce('https://admin.example.com')
          .mockReturnValueOnce('TestApp');
        configService.getOrThrow.mockReturnValue('/app');
        mockI18nContext.t.mockResolvedValue('Test String');
        mailerService.sendMail.mockResolvedValue(undefined);

        // Act
        await service.userSignUp(mailData);

        // Assert
        const callArgs = mailerService.sendMail.mock.calls[0][0];
        expect(mailerService.sendMail).toHaveBeenCalled();
        expect(callArgs.context.url).toContain('https://admin.example.com/auth/confirm-email');
        expect(callArgs.context.url).toContain('hash=confirmation-hash-123');
      });

      it('UTC_userSignUp_03: should handle consignee role correctly', async () => {
        // Arrange
        const consigneeMailData = {
          ...mailData,
          data: { ...mailData.data, role: RoleEnum.consignee },
        };
        configService.get.mockReturnValue('https://partner.example.com');
        configService.getOrThrow.mockReturnValue('/app');
        mockI18nContext.t.mockResolvedValue('Test String');
        mailerService.sendMail.mockResolvedValue(undefined);

        // Act
        await service.userSignUp(consigneeMailData);

        // Assert
        expect(mailerService.sendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            context: expect.objectContaining({
              url: expect.stringContaining('https://partner.example.com'),
            }),
          }),
        );
      });

      it('UTC_userSignUp_04: should call i18n translations when context is available', async () => {
        // Arrange
        configService.get.mockReturnValue('https://admin.example.com');
        configService.getOrThrow.mockReturnValue('/app');
        mockI18nContext.t.mockResolvedValue('Translated String');
        mailerService.sendMail.mockResolvedValue(undefined);

        // Act
        await service.userSignUp(mailData);

        // Assert
        expect(mockI18nContext.t).toHaveBeenCalledWith('common.confirmEmail');
        expect(mockI18nContext.t).toHaveBeenCalledWith('confirm-email.text1');
        expect(mockI18nContext.t).toHaveBeenCalledWith('confirm-email.text2');
        expect(mockI18nContext.t).toHaveBeenCalledWith('confirm-email.text3');
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_userSignUp_05: should handle case when I18n context is not available', async () => {
        // Arrange
        mockedI18n.current = jest.fn().mockReturnValue(null);
        configService.get.mockReturnValue('https://admin.example.com');
        configService.getOrThrow.mockReturnValue('/app');
        mailerService.sendMail.mockResolvedValue(undefined);

        // Act
        await service.userSignUp(mailData);

        // Assert
        expect(mailerService.sendMail).toHaveBeenCalled();
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_userSignUp_06: should throw error when mailer service fails', async () => {
        // Arrange
        configService.get.mockReturnValue('https://admin.example.com');
        configService.getOrThrow.mockReturnValue('/app');
        mockI18nContext.t.mockResolvedValue('Test String');
        mailerService.sendMail.mockRejectedValue(new Error('SMTP error'));

        // Act & Assert
        await expect(service.userSignUp(mailData)).rejects.toThrow('SMTP error');
      });

      it('UTC_userSignUp_07: should throw error when role is unauthorized', async () => {
        // Arrange
        const invalidRoleData = {
          ...mailData,
          data: { ...mailData.data, role: RoleEnum.user },
        };

        // Act & Assert
        await expect(service.userSignUp(invalidRoleData)).rejects.toThrow(
          'Unauthorized role',
        );
      });
    });
  });

  describe('forgotPassword', () => {
    const mailData = {
      to: 'test@example.com',
      data: {
        hash: 'reset-hash-123',
        tokenExpires: Date.now() + 3600000,
      },
    };

    describe('Normal Cases', () => {
      it('UTC_forgotPassword_01: should send password reset email with correct parameters', async () => {
        // Arrange
        configService.getOrThrow
          .mockReturnValueOnce('https://example.com')
          .mockReturnValueOnce('/app');
        mockI18nContext.t.mockResolvedValue('Test String');
        mailerService.sendMail.mockResolvedValue(undefined);

        // Act
        await service.forgotPassword(mailData);

        // Assert
        expect(mailerService.sendMail).toHaveBeenCalled();
        expect(mailerService.sendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            to: mailData.to,
            subject: expect.any(String),
          }),
        );
      });

      it('UTC_forgotPassword_02: should construct correct password reset URL', async () => {
        // Arrange
        configService.getOrThrow
          .mockReturnValueOnce('https://example.com')
          .mockReturnValueOnce('/app');
        configService.get.mockReturnValue('TestApp');
        mockI18nContext.t.mockResolvedValue('Test String');
        mailerService.sendMail.mockResolvedValue(undefined);

        // Act
        await service.forgotPassword(mailData);

        // Assert
        const callArgs = mailerService.sendMail.mock.calls[0][0];
        expect(mailerService.sendMail).toHaveBeenCalled();
        expect(callArgs.context.url).toContain('https://example.com/password-change');
        expect(callArgs.context.url).toContain('hash=reset-hash-123');
        expect(callArgs.context.url).toContain(`expires=${mailData.data.tokenExpires}`);
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_forgotPassword_03: should handle case when I18n context is not available', async () => {
        // Arrange
        mockedI18n.current = jest.fn().mockReturnValue(null);
        configService.getOrThrow
          .mockReturnValueOnce('https://example.com')
          .mockReturnValueOnce('/app');
        mailerService.sendMail.mockResolvedValue(undefined);

        // Act
        await service.forgotPassword(mailData);

        // Assert
        expect(mailerService.sendMail).toHaveBeenCalled();
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_forgotPassword_04: should throw error when mailer service fails', async () => {
        // Arrange
        configService.getOrThrow.mockReturnValue('https://example.com');
        mockI18nContext.t.mockResolvedValue('Test String');
        mailerService.sendMail.mockRejectedValue(new Error('SMTP error'));

        // Act & Assert
        await expect(service.forgotPassword(mailData)).rejects.toThrow(
          'SMTP error',
        );
      });

      it('UTC_forgotPassword_05: should throw error when config is missing', async () => {
        // Arrange
        configService.getOrThrow.mockImplementation(() => {
          throw new Error('Config not found');
        });

        // Act & Assert
        await expect(service.forgotPassword(mailData)).rejects.toThrow(
          'Config not found',
        );
      });
    });
  });
});
