import { HarvestSchedulesModule } from '../harvest-schedules/harvest-schedules.module';
import { HarvestDetailsModule } from '../harvest-details/harvest-details.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { HarvestTicketsService } from './harvest-tickets.service';
import { HarvestTicketsController } from './harvest-tickets.controller';
import { RelationalHarvestTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PdfGeneratorService } from '../utils/pdf-generator.service';

@Module({
  imports: [
    HarvestSchedulesModule,
    forwardRef(() => HarvestDetailsModule),

    // do not remove this comment
    RelationalHarvestTicketPersistenceModule,
  ],
  controllers: [HarvestTicketsController],
  providers: [HarvestTicketsService, PdfGeneratorService],
  exports: [HarvestTicketsService, RelationalHarvestTicketPersistenceModule],
})
export class HarvestTicketsModule {}
