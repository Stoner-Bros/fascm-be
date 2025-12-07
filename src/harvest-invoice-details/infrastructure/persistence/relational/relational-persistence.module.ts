import { Module } from '@nestjs/common';
import { HarvestInvoiceDetailRepository } from '../harvest-invoice-detail.repository';
import { HarvestInvoiceDetailRelationalRepository } from './repositories/harvest-invoice-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestInvoiceDetailEntity } from './entities/harvest-invoice-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestInvoiceDetailEntity])],
  providers: [
    {
      provide: HarvestInvoiceDetailRepository,
      useClass: HarvestInvoiceDetailRelationalRepository,
    },
  ],
  exports: [HarvestInvoiceDetailRepository],
})
export class RelationalHarvestInvoiceDetailPersistenceModule {}
