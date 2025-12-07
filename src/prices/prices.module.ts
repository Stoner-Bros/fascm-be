import { ProductsModule } from '../products/products.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { RelationalPricePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => ProductsModule),

    // do not remove this comment
    RelationalPricePersistenceModule,
  ],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService, RelationalPricePersistenceModule],
})
export class PricesModule {}
