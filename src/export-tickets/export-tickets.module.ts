import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { AreasModule } from 'src/areas/areas.module';
import { OrderDetailSelectionsModule } from 'src/order-detail-selections/order-detail-selections.module';
import { OrderInvoiceDetailsModule } from 'src/order-invoice-details/order-invoice-details.module';
import { ExportTicketsService } from './export-tickets.service';
import { ExportTicketsController } from './infrastructure/persistence/export-tickets.controller';
import { RelationalExportTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderInvoicesModule } from 'src/order-invoices/order-invoices.module';

@Module({
  imports: [
    OrderInvoiceDetailsModule,
    OrderInvoicesModule,

    forwardRef(() => OrderDetailSelectionsModule),
    forwardRef(() => AreasModule),

    // do not remove this comment
    RelationalExportTicketPersistenceModule,
  ],
  controllers: [ExportTicketsController],
  providers: [ExportTicketsService],
  exports: [ExportTicketsService, RelationalExportTicketPersistenceModule],
})
export class ExportTicketsModule {}
