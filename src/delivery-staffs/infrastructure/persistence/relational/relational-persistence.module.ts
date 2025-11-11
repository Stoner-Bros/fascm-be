import { Module } from '@nestjs/common';
import { DeliveryStaffRepository } from '../delivery-staff.repository';
import { DeliveryStaffRelationalRepository } from './repositories/delivery-staff.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryStaffEntity } from './entities/delivery-staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryStaffEntity])],
  providers: [
    {
      provide: DeliveryStaffRepository,
      useClass: DeliveryStaffRelationalRepository,
    },
  ],
  exports: [DeliveryStaffRepository],
})
export class RelationalDeliveryStaffPersistenceModule {}
