import { WarehousesModule } from '../warehouses/warehouses.module';
import { UsersModule } from '../users/users.module';
import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { RelationalSupplierPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AuthModule } from 'src/auth/auth.module';
import { DebtsModule } from 'src/debts/debts.module';

@Module({
  imports: [
    WarehousesModule,

    UsersModule,
    AuthModule,
    forwardRef(() => DebtsModule),

    // do not remove this comment
    RelationalSupplierPersistenceModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService, RelationalSupplierPersistenceModule],
})
export class SuppliersModule {}
