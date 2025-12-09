import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { AreasModule } from 'src/areas/areas.module';
import { BatchesModule } from 'src/batches/batches.module';
import { OrderInvoiceDetailsModule } from 'src/order-invoice-details/order-invoice-details.module';
import { ExportTicketsService } from './export-tickets.service';
import { ExportTicketsController } from './infrastructure/persistence/export-tickets.controller';
import { RelationalExportTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    OrderInvoiceDetailsModule,

    forwardRef(() => BatchesModule),
    AreasModule,

    // do not remove this comment
    RelationalExportTicketPersistenceModule,
  ],
  controllers: [ExportTicketsController],
  providers: [ExportTicketsService],
  exports: [ExportTicketsService, RelationalExportTicketPersistenceModule],
})
export class ExportTicketsModule {}
