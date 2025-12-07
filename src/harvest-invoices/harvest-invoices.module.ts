import { HarvestPhasesModule } from '../harvest-phases/harvest-phases.module';
import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestInvoicesService } from './harvest-invoices.service';
import { HarvestInvoicesController } from './harvest-invoices.controller';
import { RelationalHarvestInvoicePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => HarvestPhasesModule),

    // do not remove this comment
    RelationalHarvestInvoicePersistenceModule,
  ],
  controllers: [HarvestInvoicesController],
  providers: [HarvestInvoicesService],
  exports: [HarvestInvoicesService, RelationalHarvestInvoicePersistenceModule],
})
export class HarvestInvoicesModule {}
