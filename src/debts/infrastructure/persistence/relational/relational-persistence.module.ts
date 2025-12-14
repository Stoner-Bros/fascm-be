import { Module } from '@nestjs/common';
import { DebtRepository } from '../debt.repository';
import { DebtRelationalRepository } from './repositories/debt.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtEntity } from './entities/debt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtEntity])],
  providers: [
    {
      provide: DebtRepository,
      useClass: DebtRelationalRepository,
    },
  ],
  exports: [DebtRepository],
})
export class RelationalDebtPersistenceModule {}
