import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { DeliveryStaffsModule } from 'src/delivery-staffs/delivery-staffs.module';
import { HarvestPhasesModule } from 'src/harvest-phases/harvest-phases.module';
import { OrderPhasesModule } from 'src/order-phases/order-phases.module';
import { TrucksModule } from '../trucks/trucks.module';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { DeliveryGateway } from './delivery.gateway';
import { RelationalDeliveryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DebtsModule } from 'src/debts/debts.module';

@Module({
  imports: [
    TrucksModule,

    DeliveryStaffsModule,

    forwardRef(() => HarvestPhasesModule),

    forwardRef(() => OrderPhasesModule),
    forwardRef(() => DebtsModule),

    // do not remove this comment
    RelationalDeliveryPersistenceModule,
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService, DeliveryGateway],
  exports: [DeliveriesService, RelationalDeliveryPersistenceModule],
})
export class DeliveriesModule {}
