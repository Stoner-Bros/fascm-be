import { AppConfig } from './app-config.type';
import { AuthConfig } from '../auth/config/auth-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { FileConfig } from '../files/config/file-config.type';
import { GoogleConfig } from '../auth-google/config/google-config.type';
import { MailConfig } from '../mail/config/mail-config.type';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export type AllConfigType = {
  app: AppConfig;
  cors: CorsOptions;
  auth: AuthConfig;
  database: DatabaseConfig;
  file: FileConfig;
  google: GoogleConfig;
  mail: MailConfig;
};
