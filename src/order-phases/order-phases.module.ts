import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderSchedulesModule } from '../order-schedules/order-schedules.module';
import { RelationalOrderPhasePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderPhasesController } from './order-phases.controller';
import { OrderPhasesService } from './order-phases.service';
import { ImageProofsModule } from 'src/image-proofs/image-proofs.module';
import { FilesCloudinaryModule } from 'src/files/infrastructure/uploader/cloudinary/files.module';

@Module({
  imports: [
    forwardRef(() => OrderSchedulesModule),
    forwardRef(() => ImageProofsModule),
    FilesCloudinaryModule,

    // do not remove this comment
    RelationalOrderPhasePersistenceModule,
  ],
  controllers: [OrderPhasesController],
  providers: [OrderPhasesService],
  exports: [OrderPhasesService, RelationalOrderPhasePersistenceModule],
})
export class OrderPhasesModule {}
