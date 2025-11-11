import { Module } from '@nestjs/common';
import { OrderScheduleRepository } from '../order-schedule.repository';
import { OrderScheduleRelationalRepository } from './repositories/order-schedule.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderScheduleEntity } from './entities/order-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderScheduleEntity])],
  providers: [
    {
      provide: OrderScheduleRepository,
      useClass: OrderScheduleRelationalRepository,
    },
  ],
  exports: [OrderScheduleRepository],
})
export class RelationalOrderSchedulePersistenceModule {}
