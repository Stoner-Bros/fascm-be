import { AreasModule } from '../areas/areas.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { AreaAlertsService } from './area-alerts.service';
import { AreaAlertsController } from './area-alerts.controller';
import { RelationalAreaAlertPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    AreasModule,

    // do not remove this comment
    RelationalAreaAlertPersistenceModule,
  ],
  controllers: [AreaAlertsController],
  providers: [AreaAlertsService],
  exports: [AreaAlertsService, RelationalAreaAlertPersistenceModule],
})
export class AreaAlertsModule {}
