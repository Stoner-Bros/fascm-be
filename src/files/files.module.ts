import {
  // common
  Module,
} from '@nestjs/common';
import { RelationalFilePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesService } from './files.service';
import fileConfig from './config/file.config';
import { FileConfig, FileDriver } from './config/file-config.type';
import { FilesLocalModule } from './infrastructure/uploader/local/files.module';
import { FilesS3Module } from './infrastructure/uploader/s3/files.module';
import { FilesS3PresignedModule } from './infrastructure/uploader/s3-presigned/files.module';
import { FilesCloudinaryModule } from './infrastructure/uploader/cloudinary/files.module';

const infrastructurePersistenceModule = RelationalFilePersistenceModule;

function getUploaderModule() {
  const config = fileConfig() as FileConfig;

  switch (config.driver) {
    case FileDriver.LOCAL:
      return FilesLocalModule;
    case FileDriver.S3:
      return FilesS3Module;
    case FileDriver.S3_PRESIGNED:
      return FilesS3PresignedModule;
    case FileDriver.CLOUDINARY:
      return FilesCloudinaryModule;
    default:
      return FilesLocalModule; // fallback to local
  }
}

const infrastructureUploaderModule = getUploaderModule();

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    infrastructureUploaderModule,
  ],
  providers: [FilesService],
  exports: [FilesService, infrastructurePersistenceModule],
})
export class FilesModule {}
