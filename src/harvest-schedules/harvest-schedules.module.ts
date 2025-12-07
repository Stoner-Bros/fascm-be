import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ImageProofsModule } from '../image-proofs/image-proofs.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { HarvestSchedulesController } from './harvest-schedules.controller';
import { HarvestSchedulesService } from './harvest-schedules.service';
import { RelationalHarvestSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => ImageProofsModule),
    SuppliersModule,
    NotificationsModule,
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
