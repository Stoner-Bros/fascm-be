import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeedService } from './user-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { ManagerEntity } from '../../../../managers/infrastructure/persistence/relational/entities/manager.entity';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';
import { DeliveryStaffEntity } from '../../../../delivery-staffs/infrastructure/persistence/relational/entities/delivery-staff.entity';
import { ConsigneeEntity } from '../../../../consignees/infrastructure/persistence/relational/entities/consignee.entity';
import { SupplierEntity } from '../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import { WarehouseEntity } from '../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';
import { TruckEntity } from 'src/trucks/infrastructure/persistence/relational/entities/truck.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TruckEntity,
      ManagerEntity,
      StaffEntity,
      DeliveryStaffEntity,
      ConsigneeEntity,
      SupplierEntity,
      WarehouseEntity,
    ]),
  ],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
