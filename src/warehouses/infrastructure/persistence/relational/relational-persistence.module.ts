import { Module } from '@nestjs/common';
import { WarehouseRepository } from '../warehouse.repository';
import { WarehouseRelationalRepository } from './repositories/warehouse.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseEntity } from './entities/warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseEntity])],
  providers: [
    {
      provide: WarehouseRepository,
      useClass: WarehouseRelationalRepository,
    },
  ],
  exports: [WarehouseRepository],
})
export class RelationalWarehousePersistenceModule {}
