import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { RelationalProductPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    CategoriesModule,

    // do not remove this comment
    RelationalProductPersistenceModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, RelationalProductPersistenceModule],
})
export class ProductsModule {}
