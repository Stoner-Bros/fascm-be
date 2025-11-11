import { Module } from '@nestjs/common';
import { BatchRepository } from '../batch.repository';
import { BatchRelationalRepository } from './repositories/batch.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchEntity } from './entities/batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BatchEntity])],
  providers: [
    {
      provide: BatchRepository,
      useClass: BatchRelationalRepository,
    },
  ],
  exports: [BatchRepository],
})
export class RelationalBatchPersistenceModule {}
