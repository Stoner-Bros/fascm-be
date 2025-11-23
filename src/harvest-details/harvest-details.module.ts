import { ProductsModule } from '../products/products.module';
import { HarvestTicketsModule } from '../harvest-tickets/harvest-tickets.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { HarvestDetailsService } from './harvest-details.service';
import { HarvestDetailsController } from './harvest-details.controller';
import { RelationalHarvestDetailPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductsModule,

    forwardRef(() => HarvestTicketsModule),

    // do not remove this comment
    RelationalHarvestDetailPersistenceModule,
  ],
  controllers: [HarvestDetailsController],
  providers: [HarvestDetailsService],
  exports: [HarvestDetailsService, RelationalHarvestDetailPersistenceModule],
})
export class HarvestDetailsModule {}
