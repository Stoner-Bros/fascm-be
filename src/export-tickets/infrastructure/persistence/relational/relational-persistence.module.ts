import { Module } from '@nestjs/common';
import { ExportTicketRepository } from '../export-ticket.repository';
import { ExportTicketRelationalRepository } from './repositories/export-ticket.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportTicketEntity } from './entities/export-ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExportTicketEntity])],
  providers: [
    {
      provide: ExportTicketRepository,
      useClass: ExportTicketRelationalRepository,
    },
  ],
  exports: [ExportTicketRepository],
})
export class RelationalExportTicketPersistenceModule {}
