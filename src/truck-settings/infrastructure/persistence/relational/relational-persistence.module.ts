import { Module } from '@nestjs/common';
import { TruckSettingRepository } from '../truck-setting.repository';
import { TruckSettingRelationalRepository } from './repositories/truck-setting.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckSettingEntity } from './entities/truck-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TruckSettingEntity])],
  providers: [
    {
      provide: TruckSettingRepository,
      useClass: TruckSettingRelationalRepository,
    },
  ],
  exports: [TruckSettingRepository],
})
export class RelationalTruckSettingPersistenceModule {}
