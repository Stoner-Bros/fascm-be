import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderDetailsModule } from 'src/order-details/order-details.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { ConsigneesModule } from '../consignees/consignees.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { RelationalOrderSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderSchedulesController } from './order-schedules.controller';
import { OrderSchedulesService } from './order-schedules.service';

@Module({
  imports: [
    ConsigneesModule,
    ProductsModule,
    NotificationsModule,
    OrdersModule,
    OrderDetailsModule,
    // do not remove this comment
    RelationalOrderSchedulePersistenceModule,
  ],
  controllers: [OrderSchedulesController],
  providers: [OrderSchedulesService],
  exports: [OrderSchedulesService, RelationalOrderSchedulePersistenceModule],
})
export class OrderSchedulesModule {}
