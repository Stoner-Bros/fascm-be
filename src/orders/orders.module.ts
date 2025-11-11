import { PaymentsModule } from '../payments/payments.module';
import { OrderSchedulesModule } from '../order-schedules/order-schedules.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RelationalOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    PaymentsModule,

    OrderSchedulesModule,

    // do not remove this comment
    RelationalOrderPersistenceModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, RelationalOrderPersistenceModule],
})
export class OrdersModule {}
