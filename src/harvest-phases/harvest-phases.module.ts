import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { FilesCloudinaryModule } from 'src/files/infrastructure/uploader/cloudinary/files.module';
import { HarvestInvoiceDetailsModule } from 'src/harvest-invoice-details/harvest-invoice-details.module';
import { HarvestInvoicesModule } from 'src/harvest-invoices/harvest-invoices.module';
import { HarvestSchedulesModule } from 'src/harvest-schedules/harvest-schedules.module';
import { ImageProofsModule } from 'src/image-proofs/image-proofs.module';
import { InboundBatchesModule } from 'src/inbound-batches/inbound-batches.module';
import { ProductsModule } from 'src/products/products.module';
import { HarvestPhasesController } from './harvest-phases.controller';
import { HarvestPhasesService } from './harvest-phases.service';
import { RelationalHarvestPhasePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => HarvestSchedulesModule),
    forwardRef(() => InboundBatchesModule),
    forwardRef(() => ImageProofsModule),
    ProductsModule,
    FilesCloudinaryModule,
    HarvestInvoicesModule,
    HarvestInvoiceDetailsModule,

    // do not remove this comment
    RelationalHarvestPhasePersistenceModule,
  ],
  controllers: [HarvestPhasesController],
  providers: [HarvestPhasesService],
  exports: [HarvestPhasesService, RelationalHarvestPhasePersistenceModule],
})
export class HarvestPhasesModule {}
