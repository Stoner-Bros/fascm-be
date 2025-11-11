import { Module } from '@nestjs/common';
import { AreaRepository } from '../area.repository';
import { AreaRelationalRepository } from './repositories/area.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from './entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity])],
  providers: [
    {
      provide: AreaRepository,
      useClass: AreaRelationalRepository,
    },
  ],
  exports: [AreaRepository],
})
export class RelationalAreaPersistenceModule {}
