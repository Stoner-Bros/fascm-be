import { Module } from '@nestjs/common';
import { OrderInvoiceDetailRepository } from '../order-invoice-detail.repository';
import { OrderInvoiceDetailRelationalRepository } from './repositories/order-invoice-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInvoiceDetailEntity } from './entities/order-invoice-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderInvoiceDetailEntity])],
  providers: [
    {
      provide: OrderInvoiceDetailRepository,
      useClass: OrderInvoiceDetailRelationalRepository,
    },
  ],
  exports: [OrderInvoiceDetailRepository],
})
export class RelationalOrderInvoiceDetailPersistenceModule {}
