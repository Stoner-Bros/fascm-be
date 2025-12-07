import { Module } from '@nestjs/common';
import { OrderPhaseRepository } from '../order-phase.repository';
import { OrderPhaseRelationalRepository } from './repositories/order-phase.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderPhaseEntity } from './entities/order-phase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderPhaseEntity])],
  providers: [
    {
      provide: OrderPhaseRepository,
      useClass: OrderPhaseRelationalRepository,
    },
  ],
  exports: [OrderPhaseRepository],
})
export class RelationalOrderPhasePersistenceModule {}
