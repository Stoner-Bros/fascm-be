import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchesModule } from 'src/batches/batches.module';
import { OrderDetailSelectionsModule } from 'src/order-detail-selections/order-detail-selections.module';
import { OrderDetailEntity } from 'src/order-details/infrastructure/persistence/relational/entities/order-detail.entity';
import { OrderDetailsModule } from 'src/order-details/order-details.module';
import { OrderInvoiceDetailEntity } from 'src/order-invoice-details/infrastructure/persistence/relational/entities/order-invoice-detail.entity';
import { OrderPhaseEntity } from 'src/order-phases/infrastructure/persistence/relational/entities/order-phase.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { ConsigneesModule } from '../consignees/consignees.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { RelationalOrderSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderSchedulesController } from './order-schedules.controller';
import { OrderSchedulesService } from './order-schedules.service';
import { OrderScheduleValidationService } from './validators/order-schedule-validation.service';

@Module({
  imports: [
    ConsigneesModule,
    ProductsModule,
    NotificationsModule,
    OrdersModule,
    OrderDetailsModule,
    BatchesModule,
    OrderDetailSelectionsModule,
    // do not remove this comment
    RelationalOrderSchedulePersistenceModule,
    TypeOrmModule.forFeature([
      OrderDetailEntity,
      OrderInvoiceDetailEntity,
      OrderPhaseEntity,
    ]),
  ],
  controllers: [OrderSchedulesController],
  providers: [OrderSchedulesService, OrderScheduleValidationService],
  exports: [
    OrderSchedulesService,
    OrderScheduleValidationService,
    RelationalOrderSchedulePersistenceModule,
  ],
})
export class OrderSchedulesModule {}
