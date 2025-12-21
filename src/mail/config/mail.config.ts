import { registerAs } from '@nestjs/config';

import {
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsIn,
} from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { MailConfig, MailDriver } from './mail-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsIn(['smtp', 'sendgrid'])
  @IsOptional()
  MAIL_DRIVER: MailDriver;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  MAIL_PORT: number;

  @IsString()
  @IsOptional()
  MAIL_HOST: string;

  @IsString()
  @IsOptional()
  MAIL_USER: string;

  @IsString()
  @IsOptional()
  MAIL_PASSWORD: string;

  @IsEmail()
  MAIL_DEFAULT_EMAIL: string;

  @IsString()
  MAIL_DEFAULT_NAME: string;

  @IsBoolean()
  @IsOptional()
  MAIL_IGNORE_TLS: boolean;

  @IsBoolean()
  @IsOptional()
  MAIL_SECURE: boolean;

  @IsBoolean()
  @IsOptional()
  MAIL_REQUIRE_TLS: boolean;

  @IsString()
  @IsOptional()
  SENDGRID_API_KEY: string;
}

export default registerAs<MailConfig>('mail', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    driver: (process.env.MAIL_DRIVER as MailDriver) || 'smtp',
    port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT, 10) : 587,
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    defaultEmail: process.env.MAIL_DEFAULT_EMAIL,
    defaultName: process.env.MAIL_DEFAULT_NAME,
    ignoreTLS: process.env.MAIL_IGNORE_TLS === 'true',
    secure: process.env.MAIL_SECURE === 'true',
    requireTLS: process.env.MAIL_REQUIRE_TLS === 'true',
    sendgridApiKey: process.env.SENDGRID_API_KEY,
  };
});
