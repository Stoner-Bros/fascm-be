import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestDetailsController } from './harvest-details.controller';
import { HarvestDetailsService } from './harvest-details.service';
import { RelationalHarvestDetailPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalHarvestDetailPersistenceModule,
  ],
  controllers: [HarvestDetailsController],
  providers: [HarvestDetailsService],
  exports: [HarvestDetailsService, RelationalHarvestDetailPersistenceModule],
})
export class HarvestDetailsModule {}
