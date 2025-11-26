import { OrderDetailsModule } from '../order-details/order-details.module';
import { AreasModule } from '../areas/areas.module';
import { ProductsModule } from '../products/products.module';
import { ImportTicketsModule } from '../import-tickets/import-tickets.module';
import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { BatchesService } from './batches.service';
import { BatchesController } from './batches.controller';
import { RelationalBatchPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    OrderDetailsModule,

    AreasModule,

    ProductsModule,

    forwardRef(() => ImportTicketsModule),

    // do not remove this comment
    RelationalBatchPersistenceModule,
  ],
  controllers: [BatchesController],
  providers: [BatchesService],
  exports: [BatchesService, RelationalBatchPersistenceModule],
})
export class BatchesModule {}
