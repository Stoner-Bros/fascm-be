import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestDetailsModule } from 'src/harvest-details/harvest-details.module';
import { HarvestTicketsModule } from 'src/harvest-tickets/harvest-tickets.module';
import { ProductsModule } from 'src/products/products.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { HarvestSchedulesController } from './harvest-schedules.controller';
import { HarvestSchedulesService } from './harvest-schedules.service';
import { RelationalHarvestSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SuppliersModule,
    ProductsModule,
    NotificationsModule,
    HarvestTicketsModule,
    HarvestDetailsModule,
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
