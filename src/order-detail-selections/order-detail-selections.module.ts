import { BatchesModule } from '../batches/batches.module';
import { OrderDetailsModule } from '../order-details/order-details.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderDetailSelectionsService } from './order-detail-selections.service';
import { OrderDetailSelectionsController } from './order-detail-selections.controller';
import { RelationalOrderDetailSelectionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    BatchesModule,

    OrderDetailsModule,

    // do not remove this comment
    RelationalOrderDetailSelectionPersistenceModule,
  ],
  controllers: [OrderDetailSelectionsController],
  providers: [OrderDetailSelectionsService],
  exports: [
    OrderDetailSelectionsService,
    RelationalOrderDetailSelectionPersistenceModule,
  ],
})
export class OrderDetailSelectionsModule {}
