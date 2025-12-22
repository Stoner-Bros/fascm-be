import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestDetailsModule } from 'src/harvest-details/harvest-details.module';
import { HarvestDetailEntity } from 'src/harvest-details/infrastructure/persistence/relational/entities/harvest-detail.entity';
import { HarvestInvoiceDetailEntity } from 'src/harvest-invoice-details/infrastructure/persistence/relational/entities/harvest-invoice-detail.entity';
import { HarvestPhaseEntity } from 'src/harvest-phases/infrastructure/persistence/relational/entities/harvest-phase.entity';
import { HarvestTicketsModule } from 'src/harvest-tickets/harvest-tickets.module';
import { ProductsModule } from 'src/products/products.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { HarvestSchedulesController } from './harvest-schedules.controller';
import { HarvestSchedulesService } from './harvest-schedules.service';
import { RelationalHarvestSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { HarvestScheduleValidationService } from './validators/harvest-schedule-validation.service';
import { DebtsModule } from 'src/debts/debts.module';

@Module({
  imports: [
    SuppliersModule,
    ProductsModule,
    NotificationsModule,
    HarvestTicketsModule,
    HarvestDetailsModule,
    DebtsModule,
    // do not remove this comment
    RelationalHarvestSchedulePersistenceModule,
    TypeOrmModule.forFeature([
      HarvestDetailEntity,
      HarvestInvoiceDetailEntity,
      HarvestPhaseEntity,
    ]),
  ],
  controllers: [HarvestSchedulesController],
  providers: [HarvestSchedulesService, HarvestScheduleValidationService],
  exports: [
    HarvestSchedulesService,
    HarvestScheduleValidationService,
    RelationalHarvestSchedulePersistenceModule,
  ],
})
export class HarvestSchedulesModule {}
