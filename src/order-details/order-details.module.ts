import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RelationalOrderDetailPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrderDetailsController } from './order-details.controller';
import { OrderDetailsService } from './order-details.service';

@Module({
  imports: [
    // do not remove this comment
    RelationalOrderDetailPersistenceModule,
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService, RelationalOrderDetailPersistenceModule],
})
export class OrderDetailsModule {}
