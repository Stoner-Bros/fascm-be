import { Module } from '@nestjs/common';
import { TruckRepository } from '../truck.repository';
import { TruckRelationalRepository } from './repositories/truck.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckEntity } from './entities/truck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TruckEntity])],
  providers: [
    {
      provide: TruckRepository,
      useClass: TruckRelationalRepository,
    },
  ],
  exports: [TruckRepository],
})
export class RelationalTruckPersistenceModule {}
