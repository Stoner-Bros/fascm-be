import { InboundBatchesModule } from '../inbound-batches/inbound-batches.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ImportTicketsService } from './import-tickets.service';
import { ImportTicketsController } from './import-tickets.controller';
import { RelationalImportTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    InboundBatchesModule,

    // do not remove this comment
    RelationalImportTicketPersistenceModule,
  ],
  controllers: [ImportTicketsController],
  providers: [ImportTicketsService],
  exports: [ImportTicketsService, RelationalImportTicketPersistenceModule],
})
export class ImportTicketsModule {}
