import { Module } from '@nestjs/common';
import { ConsigneeRepository } from '../consignee.repository';
import { ConsigneeRelationalRepository } from './repositories/consignee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsigneeEntity } from './entities/consignee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsigneeEntity])],
  providers: [
    {
      provide: ConsigneeRepository,
      useClass: ConsigneeRelationalRepository,
    },
  ],
  exports: [ConsigneeRepository],
})
export class RelationalConsigneePersistenceModule {}
