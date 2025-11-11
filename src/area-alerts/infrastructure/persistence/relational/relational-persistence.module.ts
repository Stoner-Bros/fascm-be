import { Module } from '@nestjs/common';
import { AreaAlertRepository } from '../area-alert.repository';
import { AreaAlertRelationalRepository } from './repositories/area-alert.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaAlertEntity } from './entities/area-alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaAlertEntity])],
  providers: [
    {
      provide: AreaAlertRepository,
      useClass: AreaAlertRelationalRepository,
    },
  ],
  exports: [AreaAlertRepository],
})
export class RelationalAreaAlertPersistenceModule {}
