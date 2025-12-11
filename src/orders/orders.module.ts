import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RelationalOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    // do not remove this comment
    RelationalOrderPersistenceModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, RelationalOrderPersistenceModule],
})
export class OrdersModule {}
