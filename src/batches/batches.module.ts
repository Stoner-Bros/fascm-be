import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ExportTicketsModule } from 'src/export-tickets/export-tickets.module';
import { AreasModule } from '../areas/areas.module';
import { ImportTicketsModule } from '../import-tickets/import-tickets.module';
import { ProductsModule } from '../products/products.module';
import { BatchesController } from './batches.controller';
import { BatchesService } from './batches.service';
import { RelationalBatchPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    AreasModule,

    ProductsModule,

    forwardRef(() => ImportTicketsModule),
    forwardRef(() => ExportTicketsModule),

    // do not remove this comment
    RelationalBatchPersistenceModule,
  ],
  controllers: [BatchesController],
  providers: [BatchesService],
  exports: [BatchesService, RelationalBatchPersistenceModule],
})
export class BatchesModule {}
