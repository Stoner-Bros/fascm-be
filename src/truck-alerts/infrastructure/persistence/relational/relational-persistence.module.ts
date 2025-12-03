import { Module } from '@nestjs/common';
import { TruckAlertRepository } from '../truck-alert.repository';
import { TruckAlertRelationalRepository } from './repositories/truck-alert.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckAlertEntity } from './entities/truck-alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TruckAlertEntity])],
  providers: [
    {
      provide: TruckAlertRepository,
      useClass: TruckAlertRelationalRepository,
    },
  ],
  exports: [TruckAlertRepository],
})
export class RelationalTruckAlertPersistenceModule {}
