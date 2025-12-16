import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { BatchesModule } from 'src/batches/batches.module';
import { RelationalPricePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';

@Module({
  imports: [
    forwardRef(() => BatchesModule),

    // do not remove this comment
    RelationalPricePersistenceModule,
  ],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService, RelationalPricePersistenceModule],
})
export class PricesModule {}
