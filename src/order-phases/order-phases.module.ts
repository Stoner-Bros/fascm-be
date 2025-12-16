import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ExportTicketsModule } from 'src/export-tickets/export-tickets.module';
import { FilesCloudinaryModule } from 'src/files/infrastructure/uploader/cloudinary/files.module';
import { ImageProofsModule } from 'src/image-proofs/image-proofs.module';
import { OrderInvoiceDetailsModule } from 'src/order-invoice-details/order-invoice-details.module';
import { OrderInvoicesModule } from 'src/order-invoices/order-invoices.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderSchedulesModule } from '../order-schedules/order-schedules.module';
import { RelationalOrderPhasePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderPhasesController } from './order-phases.controller';
import { OrderPhasesService } from './order-phases.service';

@Module({
  imports: [
    forwardRef(() => ImageProofsModule),
    FilesCloudinaryModule,
    ProductsModule,

    forwardRef(() => OrderSchedulesModule),
    OrderInvoicesModule,
    OrderInvoiceDetailsModule,
    forwardRef(() => ExportTicketsModule),

    // do not remove this comment
    RelationalOrderPhasePersistenceModule,
  ],
  controllers: [OrderPhasesController],
  providers: [OrderPhasesService],
  exports: [OrderPhasesService, RelationalOrderPhasePersistenceModule],
})
export class OrderPhasesModule {}
