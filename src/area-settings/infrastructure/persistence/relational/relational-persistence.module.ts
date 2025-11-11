import { Module } from '@nestjs/common';
import { AreaSettingRepository } from '../area-setting.repository';
import { AreaSettingRelationalRepository } from './repositories/area-setting.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaSettingEntity } from './entities/area-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaSettingEntity])],
  providers: [
    {
      provide: AreaSettingRepository,
      useClass: AreaSettingRelationalRepository,
    },
  ],
  exports: [AreaSettingRepository],
})
export class RelationalAreaSettingPersistenceModule {}
