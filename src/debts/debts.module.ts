import { ConsigneesModule } from '../consignees/consignees.module';
import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { RelationalDebtPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [
    forwardRef(() => ConsigneesModule),
    forwardRef(() => SuppliersModule),
    forwardRef(() => PaymentsModule),

    // do not remove this comment
    RelationalDebtPersistenceModule,
  ],
  controllers: [DebtsController],
  providers: [DebtsService],
  exports: [DebtsService, RelationalDebtPersistenceModule],
})
export class DebtsModule {}
