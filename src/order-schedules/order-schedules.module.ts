import { ConsigneesModule } from '../consignees/consignees.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderSchedulesService } from './order-schedules.service';
import { OrderSchedulesController } from './order-schedules.controller';
import { RelationalOrderSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ConsigneesModule,

    // do not remove this comment
    RelationalOrderSchedulePersistenceModule,
  ],
  controllers: [OrderSchedulesController],
  providers: [OrderSchedulesService],
  exports: [OrderSchedulesService, RelationalOrderSchedulePersistenceModule],
})
export class OrderSchedulesModule {}
