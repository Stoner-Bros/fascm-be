import { Module } from '@nestjs/common';
import { HarvestPhaseRepository } from '../harvest-phase.repository';
import { HarvestPhaseRelationalRepository } from './repositories/harvest-phase.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestPhaseEntity } from './entities/harvest-phase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestPhaseEntity])],
  providers: [
    {
      provide: HarvestPhaseRepository,
      useClass: HarvestPhaseRelationalRepository,
    },
  ],
  exports: [HarvestPhaseRepository],
})
export class RelationalHarvestPhasePersistenceModule {}
