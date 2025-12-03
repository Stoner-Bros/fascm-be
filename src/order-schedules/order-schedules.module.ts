import { ImageProofsModule } from '../image-proofs/image-proofs.module';
import { ConsigneesModule } from '../consignees/consignees.module';
import { NotificationsModule } from '../notifications/notifications.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { OrderSchedulesService } from './order-schedules.service';
import { OrderSchedulesController } from './order-schedules.controller';
import { RelationalOrderSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DeliveriesModule } from '../deliveries/deliveries.module';
import { FilesCloudinaryModule } from 'src/files/infrastructure/uploader/cloudinary/files.module';

@Module({
  imports: [
    forwardRef(() => ImageProofsModule),
    FilesCloudinaryModule,
    ConsigneesModule,
    NotificationsModule,

    forwardRef(() => DeliveriesModule),

    // do not remove this comment
    RelationalOrderSchedulePersistenceModule,
  ],
  controllers: [OrderSchedulesController],
  providers: [OrderSchedulesService],
  exports: [OrderSchedulesService, RelationalOrderSchedulePersistenceModule],
})
export class OrderSchedulesModule {}
