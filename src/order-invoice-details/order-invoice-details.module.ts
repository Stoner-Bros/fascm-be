import { ExportTicketsModule } from '../export-tickets/export-tickets.module';
import { ProductsModule } from '../products/products.module';
import { OrderInvoicesModule } from '../order-invoices/order-invoices.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderInvoiceDetailsService } from './order-invoice-details.service';
import { OrderInvoiceDetailsController } from './order-invoice-details.controller';
import { RelationalOrderInvoiceDetailPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ExportTicketsModule,

    ProductsModule,

    OrderInvoicesModule,

    // do not remove this comment
    RelationalOrderInvoiceDetailPersistenceModule,
  ],
  controllers: [OrderInvoiceDetailsController],
  providers: [OrderInvoiceDetailsService],
  exports: [
    OrderInvoiceDetailsService,
    RelationalOrderInvoiceDetailPersistenceModule,
  ],
})
export class OrderInvoiceDetailsModule {}
