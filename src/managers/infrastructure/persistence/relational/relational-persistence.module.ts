import { Module } from '@nestjs/common';
import { ManagerRepository } from '../manager.repository';
import { ManagerRelationalRepository } from './repositories/manager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity])],
  providers: [
    {
      provide: ManagerRepository,
      useClass: ManagerRelationalRepository,
    },
  ],
  exports: [ManagerRepository],
})
export class RelationalManagerPersistenceModule {}
