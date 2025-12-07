import { PaymentsModule } from '../payments/payments.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderInvoicesService } from './order-invoices.service';
import { OrderInvoicesController } from './order-invoices.controller';
import { RelationalOrderInvoicePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderPhasesModule } from 'src/order-phases/order-phases.module';

@Module({
  imports: [
    PaymentsModule,

    OrderInvoicesModule,
    OrderPhasesModule,
    // do not remove this comment
    RelationalOrderInvoicePersistenceModule,
  ],
  controllers: [OrderInvoicesController],
  providers: [OrderInvoicesService],
  exports: [OrderInvoicesService, RelationalOrderInvoicePersistenceModule],
})
export class OrderInvoicesModule {}
