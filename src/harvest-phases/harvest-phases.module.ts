import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestPhasesService } from './harvest-phases.service';
import { HarvestPhasesController } from './harvest-phases.controller';
import { RelationalHarvestPhasePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { HarvestSchedulesModule } from 'src/harvest-schedules/harvest-schedules.module';

@Module({
  imports: [
    forwardRef(() => HarvestSchedulesModule),

    // do not remove this comment
    RelationalHarvestPhasePersistenceModule,
  ],
  controllers: [HarvestPhasesController],
  providers: [HarvestPhasesService],
  exports: [HarvestPhasesService, RelationalHarvestPhasePersistenceModule],
})
export class HarvestPhasesModule {}
