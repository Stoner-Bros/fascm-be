import { OrderDetailsModule } from '../order-details/order-details.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ExportTicketsService } from './export-tickets.service';
import { ExportTicketsController } from './export-tickets.controller';
import { RelationalExportTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    OrderDetailsModule,

    // do not remove this comment
    RelationalExportTicketPersistenceModule,
  ],
  controllers: [ExportTicketsController],
  providers: [ExportTicketsService],
  exports: [ExportTicketsService, RelationalExportTicketPersistenceModule],
})
export class ExportTicketsModule {}
