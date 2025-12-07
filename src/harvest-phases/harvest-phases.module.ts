import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestPhasesService } from './harvest-phases.service';
import { HarvestPhasesController } from './harvest-phases.controller';
import { RelationalHarvestPhasePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { HarvestSchedulesModule } from 'src/harvest-schedules/harvest-schedules.module';
import { HarvestInvoicesModule } from 'src/harvest-invoices/harvest-invoices.module';
import { FilesCloudinaryModule } from 'src/files/infrastructure/uploader/cloudinary/files.module';
import { ImageProofsModule } from 'src/image-proofs/image-proofs.module';
import { HarvestInvoiceDetailsModule } from 'src/harvest-invoice-details/harvest-invoice-details.module';
import { InboundBatchesModule } from 'src/inbound-batches/inbound-batches.module';

@Module({
  imports: [
    forwardRef(() => HarvestSchedulesModule),
    forwardRef(() => HarvestInvoicesModule),
    forwardRef(() => HarvestInvoiceDetailsModule),
    forwardRef(() => InboundBatchesModule),
    forwardRef(() => ImageProofsModule),
    forwardRef(() => FilesCloudinaryModule),

    // do not remove this comment
    RelationalHarvestPhasePersistenceModule,
  ],
  controllers: [HarvestPhasesController],
  providers: [HarvestPhasesService],
  exports: [HarvestPhasesService, RelationalHarvestPhasePersistenceModule],
})
export class HarvestPhasesModule {}
