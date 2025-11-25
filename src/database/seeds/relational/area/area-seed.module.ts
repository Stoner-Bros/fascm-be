import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaSeedService } from './area-seed.service';
import { AreaEntity } from '../../../../areas/infrastructure/persistence/relational/entities/area.entity';
import { WarehouseEntity } from '../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity, WarehouseEntity])],
  providers: [AreaSeedService],
  exports: [AreaSeedService],
})
export class AreaSeedModule {}
