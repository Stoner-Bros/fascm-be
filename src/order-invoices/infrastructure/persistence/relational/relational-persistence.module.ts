import { Module } from '@nestjs/common';
import { OrderInvoiceRepository } from '../order-invoice.repository';
import { OrderInvoiceRelationalRepository } from './repositories/order-invoice.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInvoiceEntity } from './entities/order-invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderInvoiceEntity])],
  providers: [
    {
      provide: OrderInvoiceRepository,
      useClass: OrderInvoiceRelationalRepository,
    },
  ],
  exports: [OrderInvoiceRepository],
})
export class RelationalOrderInvoicePersistenceModule {}
