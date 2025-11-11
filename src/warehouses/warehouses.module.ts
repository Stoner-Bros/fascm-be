import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { RelationalWarehousePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalWarehousePersistenceModule,
  ],
  controllers: [WarehousesController],
  providers: [WarehousesService],
  exports: [WarehousesService, RelationalWarehousePersistenceModule],
})
export class WarehousesModule {}
