import { SuppliersModule } from '../suppliers/suppliers.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestSchedulesService } from './harvest-schedules.service';
import { HarvestSchedulesController } from './harvest-schedules.controller';
import { RelationalHarvestSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SuppliersModule,

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
