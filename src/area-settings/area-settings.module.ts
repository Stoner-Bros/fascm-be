import { AreasModule } from '../areas/areas.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { AreaSettingsService } from './area-settings.service';
import { AreaSettingsController } from './area-settings.controller';
import { RelationalAreaSettingPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    AreasModule,

    // do not remove this comment
    RelationalAreaSettingPersistenceModule,
  ],
  controllers: [AreaSettingsController],
  providers: [AreaSettingsService],
  exports: [AreaSettingsService, RelationalAreaSettingPersistenceModule],
})
export class AreaSettingsModule {}
