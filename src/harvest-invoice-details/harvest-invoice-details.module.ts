import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestInvoiceDetailsController } from './harvest-invoice-details.controller';
import { HarvestInvoiceDetailsService } from './harvest-invoice-details.service';
import { RelationalHarvestInvoiceDetailPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
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
