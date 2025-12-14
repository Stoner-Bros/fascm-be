import { UsersModule } from '../users/users.module';
import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ConsigneesService } from './consignees.service';
import { ConsigneesController } from './consignees.controller';
import { RelationalConsigneePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AuthModule } from 'src/auth/auth.module';
import { DebtsModule } from 'src/debts/debts.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    forwardRef(() => DebtsModule),

    // do not remove this comment
    RelationalConsigneePersistenceModule,
  ],
  controllers: [ConsigneesController],
  providers: [ConsigneesService],
  exports: [ConsigneesService, RelationalConsigneePersistenceModule],
})
export class ConsigneesModule {}
