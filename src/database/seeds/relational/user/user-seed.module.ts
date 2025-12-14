import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DebtEntity } from 'src/debts/infrastructure/persistence/relational/entities/debt.entity';
import { TruckEntity } from 'src/trucks/infrastructure/persistence/relational/entities/truck.entity';
import { ConsigneeEntity } from '../../../../consignees/infrastructure/persistence/relational/entities/consignee.entity';
import { DeliveryStaffEntity } from '../../../../delivery-staffs/infrastructure/persistence/relational/entities/delivery-staff.entity';
import { ManagerEntity } from '../../../../managers/infrastructure/persistence/relational/entities/manager.entity';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';
import { SupplierEntity } from '../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { WarehouseEntity } from '../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';
import { UserSeedService } from './user-seed.service';

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
      DebtEntity,
    ]),
  ],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
