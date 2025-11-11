import { Module } from '@nestjs/common';
import { HarvestTicketRepository } from '../harvest-ticket.repository';
import { HarvestTicketRelationalRepository } from './repositories/harvest-ticket.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestTicketEntity } from './entities/harvest-ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestTicketEntity])],
  providers: [
    {
      provide: HarvestTicketRepository,
      useClass: HarvestTicketRelationalRepository,
    },
  ],
  exports: [HarvestTicketRepository],
})
export class RelationalHarvestTicketPersistenceModule {}
