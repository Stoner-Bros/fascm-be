import { TrucksModule } from '../trucks/trucks.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { TruckSettingsService } from './truck-settings.service';
import { TruckSettingsController } from './truck-settings.controller';
import { RelationalTruckSettingPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => TrucksModule),

    // do not remove this comment
    RelationalTruckSettingPersistenceModule,
  ],
  controllers: [TruckSettingsController],
  providers: [TruckSettingsService],
  exports: [TruckSettingsService, RelationalTruckSettingPersistenceModule],
})
export class TruckSettingsModule {}
