import { SuppliersModule } from '../suppliers/suppliers.module';
import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestSchedulesService } from './harvest-schedules.service';
import { HarvestSchedulesController } from './harvest-schedules.controller';
import { RelationalHarvestSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { HarvestTicketsModule } from 'src/harvest-tickets/harvest-tickets.module';
import { HarvestDetailsModule } from 'src/harvest-details/harvest-details.module';
import { InboundBatchesModule } from 'src/inbound-batches/inbound-batches.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';

@Module({
  imports: [
    SuppliersModule,

    forwardRef(() => HarvestTicketsModule),
    forwardRef(() => HarvestDetailsModule),
    forwardRef(() => DeliveriesModule),
    InboundBatchesModule,
    NotificationsModule,
    // do not remove this comment
    RelationalHarvestSchedulePersistenceModule,
  ],
  controllers: [HarvestSchedulesController],
  providers: [HarvestSchedulesService],
  exports: [
    HarvestSchedulesService,
    RelationalHarvestSchedulePersistenceModule,
  ],
})
export class HarvestSchedulesModule {}
