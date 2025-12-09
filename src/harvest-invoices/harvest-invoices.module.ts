import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestInvoicesController } from './harvest-invoices.controller';
import { HarvestInvoicesService } from './harvest-invoices.service';
import { RelationalHarvestInvoicePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalHarvestInvoicePersistenceModule],
  controllers: [HarvestInvoicesController],
  providers: [HarvestInvoicesService],
  exports: [HarvestInvoicesService, RelationalHarvestInvoicePersistenceModule],
})
export class HarvestInvoicesModule {}
