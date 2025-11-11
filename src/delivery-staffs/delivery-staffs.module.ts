import { TrucksModule } from '../trucks/trucks.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { DeliveryStaffsService } from './delivery-staffs.service';
import { DeliveryStaffsController } from './delivery-staffs.controller';
import { RelationalDeliveryStaffPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    TrucksModule,

    WarehousesModule,

    UsersModule,

    // do not remove this comment
    RelationalDeliveryStaffPersistenceModule,
  ],
  controllers: [DeliveryStaffsController],
  providers: [DeliveryStaffsService],
  exports: [DeliveryStaffsService, RelationalDeliveryStaffPersistenceModule],
})
export class DeliveryStaffsModule {}
