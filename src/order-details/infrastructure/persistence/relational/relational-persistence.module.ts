import { Module } from '@nestjs/common';
import { OrderDetailRepository } from '../order-detail.repository';
import { OrderDetailRelationalRepository } from './repositories/order-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
  providers: [
    {
      provide: OrderDetailRepository,
      useClass: OrderDetailRelationalRepository,
    },
  ],
  exports: [OrderDetailRepository],
})
export class RelationalOrderDetailPersistenceModule {}
