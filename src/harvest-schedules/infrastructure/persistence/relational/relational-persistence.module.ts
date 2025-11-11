import { Module } from '@nestjs/common';
import { HarvestScheduleRepository } from '../harvest-schedule.repository';
import { HarvestScheduleRelationalRepository } from './repositories/harvest-schedule.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestScheduleEntity } from './entities/harvest-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestScheduleEntity])],
  providers: [
    {
      provide: HarvestScheduleRepository,
      useClass: HarvestScheduleRelationalRepository,
    },
  ],
  exports: [HarvestScheduleRepository],
})
export class RelationalHarvestSchedulePersistenceModule {}
