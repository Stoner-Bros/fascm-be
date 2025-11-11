import { ProductsModule } from '../products/products.module';
import { HarvestDetailsModule } from '../harvest-details/harvest-details.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { InboundBatchesService } from './inbound-batches.service';
import { InboundBatchesController } from './inbound-batches.controller';
import { RelationalInboundBatchPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductsModule,

    HarvestDetailsModule,

    // do not remove this comment
    RelationalInboundBatchPersistenceModule,
  ],
  controllers: [InboundBatchesController],
  providers: [InboundBatchesService],
  exports: [InboundBatchesService, RelationalInboundBatchPersistenceModule],
})
export class InboundBatchesModule {}
