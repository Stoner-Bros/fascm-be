import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { AreasModule } from 'src/areas/areas.module';
import { BatchesModule } from 'src/batches/batches.module';
import { InboundBatchesModule } from '../inbound-batches/inbound-batches.module';
import { ImportTicketsController } from './import-tickets.controller';
import { ImportTicketsService } from './import-tickets.service';
import { RelationalImportTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => InboundBatchesModule),
    forwardRef(() => BatchesModule),
    forwardRef(() => AreasModule),

    // do not remove this comment
    RelationalImportTicketPersistenceModule,
  ],
  controllers: [ImportTicketsController],
  providers: [ImportTicketsService],
  exports: [ImportTicketsService, RelationalImportTicketPersistenceModule],
})
export class ImportTicketsModule {}
