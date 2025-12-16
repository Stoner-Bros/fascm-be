import {
  // do not remove this comment
  forwardRef,
  Module,
} from '@nestjs/common';
import { ImportTicketsModule } from 'src/import-tickets/import-tickets.module';
import { ExportTicketsModule } from 'src/export-tickets/export-tickets.module';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { RelationalWarehousePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalWarehousePersistenceModule,
    forwardRef(() => ImportTicketsModule),
    forwardRef(() => ExportTicketsModule),
  ],
  controllers: [WarehousesController],
  providers: [WarehousesService],
  exports: [WarehousesService, RelationalWarehousePersistenceModule],
})
export class WarehousesModule {}
