import { HarvestSchedulesModule } from '../harvest-schedules/harvest-schedules.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { HarvestTicketsService } from './harvest-tickets.service';
import { HarvestTicketsController } from './harvest-tickets.controller';
import { RelationalHarvestTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    HarvestSchedulesModule,

    // do not remove this comment
    RelationalHarvestTicketPersistenceModule,
  ],
  controllers: [HarvestTicketsController],
  providers: [HarvestTicketsService],
  exports: [HarvestTicketsService, RelationalHarvestTicketPersistenceModule],
})
export class HarvestTicketsModule {}
