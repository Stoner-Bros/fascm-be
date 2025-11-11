import { Module } from '@nestjs/common';
import { HarvestDetailRepository } from '../harvest-detail.repository';
import { HarvestDetailRelationalRepository } from './repositories/harvest-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestDetailEntity } from './entities/harvest-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestDetailEntity])],
  providers: [
    {
      provide: HarvestDetailRepository,
      useClass: HarvestDetailRelationalRepository,
    },
  ],
  exports: [HarvestDetailRepository],
})
export class RelationalHarvestDetailPersistenceModule {}
