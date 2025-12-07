import { ProductsModule } from '../products/products.module';
import { HarvestInvoicesModule } from '../harvest-invoices/harvest-invoices.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestInvoiceDetailsService } from './harvest-invoice-details.service';
import { HarvestInvoiceDetailsController } from './harvest-invoice-details.controller';
import { RelationalHarvestInvoiceDetailPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductsModule,

    HarvestInvoicesModule,

    // do not remove this comment
    RelationalHarvestInvoiceDetailPersistenceModule,
  ],
  controllers: [HarvestInvoiceDetailsController],
  providers: [HarvestInvoiceDetailsService],
  exports: [
    HarvestInvoiceDetailsService,
    RelationalHarvestInvoiceDetailPersistenceModule,
  ],
})
export class HarvestInvoiceDetailsModule {}
