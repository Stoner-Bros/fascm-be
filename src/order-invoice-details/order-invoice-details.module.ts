import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RelationalOrderInvoiceDetailPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderInvoiceDetailsController } from './order-invoice-details.controller';
import { OrderInvoiceDetailsService } from './order-invoice-details.service';

@Module({
  imports: [RelationalOrderInvoiceDetailPersistenceModule],
  controllers: [OrderInvoiceDetailsController],
  providers: [OrderInvoiceDetailsService],
  exports: [
    OrderInvoiceDetailsService,
    RelationalOrderInvoiceDetailPersistenceModule,
  ],
})
export class OrderInvoiceDetailsModule {}
