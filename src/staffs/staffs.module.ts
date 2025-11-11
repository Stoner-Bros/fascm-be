import { WarehousesModule } from '../warehouses/warehouses.module';
import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { RelationalStaffPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    WarehousesModule,

    UsersModule,

    // do not remove this comment
    RelationalStaffPersistenceModule,
  ],
  controllers: [StaffsController],
  providers: [StaffsService],
  exports: [StaffsService, RelationalStaffPersistenceModule],
})
export class StaffsModule {}
