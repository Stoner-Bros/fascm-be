import { Module } from '@nestjs/common';
import { OrderDetailSelectionRepository } from '../order-detail-selection.repository';
import { OrderDetailSelectionRelationalRepository } from './repositories/order-detail-selection.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailSelectionEntity } from './entities/order-detail-selection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailSelectionEntity])],
  providers: [
    {
      provide: OrderDetailSelectionRepository,
      useClass: OrderDetailSelectionRelationalRepository,
    },
  ],
  exports: [OrderDetailSelectionRepository],
})
export class RelationalOrderDetailSelectionPersistenceModule {}
