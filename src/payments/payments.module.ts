import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { DebtsModule } from 'src/debts/debts.module';
import { RelationalPaymentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PaymentsController } from './payments.controller';
import { PaymentsGateway } from './payments.gateway';
import { PaymentsService } from './payments.service';
import { PayosWebhookController } from './payos-webhook.controller';

@Module({
  imports: [
    DebtsModule,
    // do not remove this comment
    RelationalPaymentPersistenceModule,
  ],
  controllers: [PaymentsController, PayosWebhookController],
  providers: [PaymentsService, PaymentsGateway],
  exports: [PaymentsService, RelationalPaymentPersistenceModule],
})
export class PaymentsModule {}
