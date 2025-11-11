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

@Module({
  imports: [
    TrucksModule,

    HarvestSchedulesModule,

    OrderSchedulesModule,

    // do not remove this comment
    RelationalDeliveryPersistenceModule,
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [DeliveriesService, RelationalDeliveryPersistenceModule],
})
export class DeliveriesModule {}
