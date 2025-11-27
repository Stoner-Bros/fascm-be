import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesCloudinaryService } from './files.service';
import { FilesCloudinaryController } from './files.controller';
import { RelationalFilePersistenceModule } from '../../persistence/relational/relational-persistence.module';
import { AllConfigType } from '../../../../config/config.type';

@Module({
  imports: [
    RelationalFilePersistenceModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fileFilter: (request, file, callback) => {
          if (
            !file.originalname.match(/\.(jpg|jpeg|png|gif|webp|pdf|doc|docx)$/)
          ) {
            return callback(
              new Error('Only image files and documents are allowed!'),
              false,
            );
          }
          callback(null, true);
        },
        limits: {
          fileSize: configService.getOrThrow('file.maxFileSize', {
            infer: true,
          }),
        },
      }),
    }),
  ],
  controllers: [FilesCloudinaryController],
  providers: [FilesCloudinaryService],
  exports: [FilesCloudinaryService],
})
export class FilesCloudinaryModule {}
