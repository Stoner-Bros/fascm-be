import { OrderSchedulesModule } from '../order-schedules/order-schedules.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderPhasesService } from './order-phases.service';
import { OrderPhasesController } from './order-phases.controller';
import { RelationalOrderPhasePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    OrderSchedulesModule,

    // do not remove this comment
    RelationalOrderPhasePersistenceModule,
  ],
  controllers: [OrderPhasesController],
  providers: [OrderPhasesService],
  exports: [OrderPhasesService, RelationalOrderPhasePersistenceModule],
})
export class OrderPhasesModule {}
