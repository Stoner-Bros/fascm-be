import { TrucksModule } from '../trucks/trucks.module';
import { HarvestSchedulesModule } from '../harvest-schedules/harvest-schedules.module';
import { OrderSchedulesModule } from '../order-schedules/order-schedules.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { RelationalDeliveryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DeliveryGateway } from './delivery.gateway';

@Module({
  imports: [
    TrucksModule,

    HarvestSchedulesModule,

    OrderSchedulesModule,

    // do not remove this comment
    RelationalDeliveryPersistenceModule,
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService, DeliveryGateway],
  exports: [DeliveriesService, RelationalDeliveryPersistenceModule],
})
export class DeliveriesModule {}
