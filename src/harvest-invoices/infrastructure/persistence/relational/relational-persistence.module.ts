import { Module } from '@nestjs/common';
import { HarvestInvoiceRepository } from '../harvest-invoice.repository';
import { HarvestInvoiceRelationalRepository } from './repositories/harvest-invoice.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestInvoiceEntity } from './entities/harvest-invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestInvoiceEntity])],
  providers: [
    {
      provide: HarvestInvoiceRepository,
      useClass: HarvestInvoiceRelationalRepository,
    },
  ],
  exports: [HarvestInvoiceRepository],
})
export class RelationalHarvestInvoicePersistenceModule {}
