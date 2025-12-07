import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderDetailsModule } from '../order-details/order-details.module';
import { OrderSchedulesModule } from '../order-schedules/order-schedules.module';
import { RelationalOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    forwardRef(() => OrderSchedulesModule),

    forwardRef(() => OrderDetailsModule),

    // do not remove this comment
    RelationalOrderPersistenceModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, RelationalOrderPersistenceModule],
})
export class OrdersModule {}
