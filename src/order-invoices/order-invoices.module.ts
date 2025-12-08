import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RelationalOrderInvoicePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderInvoicesController } from './order-invoices.controller';
import { OrderInvoicesService } from './order-invoices.service';

@Module({
  imports: [RelationalOrderInvoicePersistenceModule],
  controllers: [OrderInvoicesController],
  providers: [OrderInvoicesService],
  exports: [OrderInvoicesService, RelationalOrderInvoicePersistenceModule],
})
export class OrderInvoicesModule {}
