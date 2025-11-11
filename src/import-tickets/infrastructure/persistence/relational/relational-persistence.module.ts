import { Module } from '@nestjs/common';
import { ImportTicketRepository } from '../import-ticket.repository';
import { ImportTicketRelationalRepository } from './repositories/import-ticket.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportTicketEntity } from './entities/import-ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImportTicketEntity])],
  providers: [
    {
      provide: ImportTicketRepository,
      useClass: ImportTicketRelationalRepository,
    },
  ],
  exports: [ImportTicketRepository],
})
export class RelationalImportTicketPersistenceModule {}
