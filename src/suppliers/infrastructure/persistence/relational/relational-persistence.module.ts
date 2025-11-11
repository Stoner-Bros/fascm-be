import { Module } from '@nestjs/common';
import { SupplierRepository } from '../supplier.repository';
import { SupplierRelationalRepository } from './repositories/supplier.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  providers: [
    {
      provide: SupplierRepository,
      useClass: SupplierRelationalRepository,
    },
  ],
  exports: [SupplierRepository],
})
export class RelationalSupplierPersistenceModule {}
