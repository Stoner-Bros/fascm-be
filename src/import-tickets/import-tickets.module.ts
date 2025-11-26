import { InboundBatchesModule } from '../inbound-batches/inbound-batches.module';
import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ImportTicketsService } from './import-tickets.service';
import { ImportTicketsController } from './import-tickets.controller';
import { RelationalImportTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { BatchesModule } from 'src/batches/batches.module';

@Module({
  imports: [
    InboundBatchesModule,
    forwardRef(() => BatchesModule),

    // do not remove this comment
    RelationalImportTicketPersistenceModule,
  ],
  controllers: [ImportTicketsController],
  providers: [ImportTicketsService],
  exports: [ImportTicketsService, RelationalImportTicketPersistenceModule],
})
export class ImportTicketsModule {}
