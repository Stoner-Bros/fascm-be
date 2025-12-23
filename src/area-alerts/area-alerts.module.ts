import { AreasModule } from '../areas/areas.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { AreaAlertsService } from './area-alerts.service';
import { AreaAlertsController } from './area-alerts.controller';
import { RelationalAreaAlertPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { IoTDevicesModule } from '../io-t-devices/io-t-devices.module';

@Module({
  imports: [
    forwardRef(() => AreasModule),

    // do not remove this comment
    RelationalAreaAlertPersistenceModule,
    forwardRef(() => NotificationsModule),
    forwardRef(() => IoTDevicesModule),
  ],
  controllers: [AreaAlertsController],
  providers: [AreaAlertsService],
  exports: [AreaAlertsService, RelationalAreaAlertPersistenceModule],
})
export class AreaAlertsModule {}
