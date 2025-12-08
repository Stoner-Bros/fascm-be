import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { PdfGeneratorService } from '../utils/pdf-generator.helper';
import { HarvestTicketsController } from './harvest-tickets.controller';
import { HarvestTicketsService } from './harvest-tickets.service';
import { RelationalHarvestTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalHarvestTicketPersistenceModule,
  ],
  controllers: [HarvestTicketsController],
  providers: [HarvestTicketsService, PdfGeneratorService],
  exports: [HarvestTicketsService, RelationalHarvestTicketPersistenceModule],
})
export class HarvestTicketsModule {}
