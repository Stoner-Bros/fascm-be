import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { RelationalPaymentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PayosWebhookController } from './payos-webhook.controller';

@Module({
  imports: [
    // do not remove this comment
    RelationalPaymentPersistenceModule,
  ],
  controllers: [PaymentsController, PayosWebhookController],
  providers: [PaymentsService],
  exports: [PaymentsService, RelationalPaymentPersistenceModule],
})
export class PaymentsModule {}
