import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { RelationalPaymentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PayosWebhookController } from './payos-webhook.controller';
import { OrderInvoicesModule } from '../order-invoices/order-invoices.module';
import { PaymentsGateway } from './payments.gateway';

@Module({
  imports: [
    // do not remove this comment
    RelationalPaymentPersistenceModule,
    OrderInvoicesModule,
  ],
  controllers: [PaymentsController, PayosWebhookController],
  providers: [PaymentsService, PaymentsGateway],
  exports: [PaymentsService, RelationalPaymentPersistenceModule],
})
export class PaymentsModule {}
