import { TrucksModule } from '../trucks/trucks.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { TruckAlertsService } from './truck-alerts.service';
import { TruckAlertsController } from './truck-alerts.controller';
import { RelationalTruckAlertPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => TrucksModule),

    // do not remove this comment
    RelationalTruckAlertPersistenceModule,
  ],
  controllers: [TruckAlertsController],
  providers: [TruckAlertsService],
  exports: [TruckAlertsService, RelationalTruckAlertPersistenceModule],
})
export class TruckAlertsModule {}
