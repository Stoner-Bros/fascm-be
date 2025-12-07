import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestInvoiceDetailsModule } from 'src/harvest-invoice-details/harvest-invoice-details.module';
import { ImportTicketsModule } from 'src/import-tickets/import-tickets.module';
import { InboundBatchesController } from './inbound-batches.controller';
import { InboundBatchesService } from './inbound-batches.service';
import { RelationalInboundBatchPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ImportTicketsModule,
    HarvestInvoiceDetailsModule,
    // do not remove this comment
    RelationalInboundBatchPersistenceModule,
  ],
  controllers: [InboundBatchesController],
  providers: [InboundBatchesService],
  exports: [InboundBatchesService, RelationalInboundBatchPersistenceModule],
})
export class InboundBatchesModule {}
