import { Module } from '@nestjs/common';
import { InboundBatchRepository } from '../inbound-batch.repository';
import { InboundBatchRelationalRepository } from './repositories/inbound-batch.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InboundBatchEntity } from './entities/inbound-batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InboundBatchEntity])],
  providers: [
    {
      provide: InboundBatchRepository,
      useClass: InboundBatchRelationalRepository,
    },
  ],
  exports: [InboundBatchRepository],
})
export class RelationalInboundBatchPersistenceModule {}
