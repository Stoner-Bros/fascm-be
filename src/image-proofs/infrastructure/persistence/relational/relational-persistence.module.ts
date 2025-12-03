import { Module } from '@nestjs/common';
import { ImageProofRepository } from '../image-proof.repository';
import { ImageProofRelationalRepository } from './repositories/image-proof.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageProofEntity } from './entities/image-proof.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageProofEntity])],
  providers: [
    {
      provide: ImageProofRepository,
      useClass: ImageProofRelationalRepository,
    },
  ],
  exports: [ImageProofRepository],
})
export class RelationalImageProofPersistenceModule {}
