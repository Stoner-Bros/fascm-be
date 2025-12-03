import { OrderSchedulesModule } from '../order-schedules/order-schedules.module';
import { HarvestSchedulesModule } from '../harvest-schedules/harvest-schedules.module';
import { FilesModule } from '../files/files.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { ImageProofsService } from './image-proofs.service';
import { ImageProofsController } from './image-proofs.controller';
import { RelationalImageProofPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => OrderSchedulesModule),

    forwardRef(() => HarvestSchedulesModule),

    FilesModule,

    // do not remove this comment
    RelationalImageProofPersistenceModule,
  ],
  controllers: [ImageProofsController],
  providers: [ImageProofsService],
  exports: [ImageProofsService, RelationalImageProofPersistenceModule],
})
export class ImageProofsModule {}
