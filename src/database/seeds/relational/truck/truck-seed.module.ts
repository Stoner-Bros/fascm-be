import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckSeedService } from './truck-seed.service';
import { TruckEntity } from '../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TruckEntity])],
  providers: [TruckSeedService],
  exports: [TruckSeedService],
})
export class TruckSeedModule {}
