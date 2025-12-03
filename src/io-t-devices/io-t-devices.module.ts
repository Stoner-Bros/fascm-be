import { TrucksModule } from '../trucks/trucks.module';
import { AreasModule } from '../areas/areas.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { IoTDevicesService } from './io-t-devices.service';
import { IoTDevicesController } from './io-t-devices.controller';
import { RelationalIoTDevicePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { MqttService } from './mqtt.service';
import { IoTGateway } from './iot.gateway';
import { AreaSettingsModule } from 'src/area-settings/area-settings.module';
import { AreaAlertsModule } from 'src/area-alerts/area-alerts.module';
import { TruckSettingsModule } from 'src/truck-settings/truck-settings.module';
import { TruckAlertsModule } from 'src/truck-alerts/truck-alerts.module';

@Module({
  imports: [
    forwardRef(() => TrucksModule),

    forwardRef(() => AreasModule),
    AreaSettingsModule,
    AreaAlertsModule,
    TruckSettingsModule,
    TruckAlertsModule,

    // do not remove this comment
    RelationalIoTDevicePersistenceModule,
  ],
  controllers: [IoTDevicesController],
  providers: [IoTDevicesService, MqttService, IoTGateway],
  exports: [
    IoTDevicesService,
    RelationalIoTDevicePersistenceModule,
    IoTGateway,
  ],
})
export class IoTDevicesModule {}
