import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseSeedService } from './warehouse-seed.service';
import { WarehouseEntity } from '../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseEntity])],
  providers: [WarehouseSeedService],
  exports: [WarehouseSeedService],
})
export class WarehouseSeedModule {}
