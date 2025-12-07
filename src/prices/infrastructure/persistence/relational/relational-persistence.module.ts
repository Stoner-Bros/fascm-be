import { Module } from '@nestjs/common';
import { PriceRepository } from '../price.repository';
import { PriceRelationalRepository } from './repositories/price.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceEntity } from './entities/price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceEntity])],
  providers: [
    {
      provide: PriceRepository,
      useClass: PriceRelationalRepository,
    },
  ],
  exports: [PriceRepository],
})
export class RelationalPricePersistenceModule {}
