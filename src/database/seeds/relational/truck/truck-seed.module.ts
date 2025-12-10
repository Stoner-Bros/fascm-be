import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckSeedService } from './truck-seed.service';
import { TruckEntity } from '../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';
import { WarehouseEntity } from 'src/warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TruckEntity, WarehouseEntity])],
  providers: [TruckSeedService],
  exports: [TruckSeedService],
})
export class TruckSeedModule {}
