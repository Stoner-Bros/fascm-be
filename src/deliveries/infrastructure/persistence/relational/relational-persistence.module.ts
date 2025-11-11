import { Module } from '@nestjs/common';
import { DeliveryRepository } from '../delivery.repository';
import { DeliveryRelationalRepository } from './repositories/delivery.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from './entities/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryEntity])],
  providers: [
    {
      provide: DeliveryRepository,
      useClass: DeliveryRelationalRepository,
    },
  ],
  exports: [DeliveryRepository],
})
export class RelationalDeliveryPersistenceModule {}
