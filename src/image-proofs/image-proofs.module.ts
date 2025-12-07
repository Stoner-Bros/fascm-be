import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { HarvestPhasesModule } from 'src/harvest-phases/harvest-phases.module';
import { OrderPhasesModule } from 'src/order-phases/order-phases.module';
import { FilesModule } from '../files/files.module';
import { ImageProofsController } from './image-proofs.controller';
import { ImageProofsService } from './image-proofs.service';
import { RelationalImageProofPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => OrderPhasesModule),

    forwardRef(() => HarvestPhasesModule),

    FilesModule,

    // do not remove this comment
    RelationalImageProofPersistenceModule,
  ],
  controllers: [ImageProofsController],
  providers: [ImageProofsService],
  exports: [ImageProofsService, RelationalImageProofPersistenceModule],
})
export class ImageProofsModule {}
