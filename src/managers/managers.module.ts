import { WarehousesModule } from '../warehouses/warehouses.module';
import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { RelationalManagerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    WarehousesModule,

    UsersModule,

    // do not remove this comment
    RelationalManagerPersistenceModule,
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService, RelationalManagerPersistenceModule],
})
export class ManagersModule {}
