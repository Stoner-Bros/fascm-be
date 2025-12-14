import { Debt } from '../../../../domain/debt';
import { ConsigneeMapper } from '../../../../../consignees/infrastructure/persistence/relational/mappers/consignee.mapper';

import { DebtEntity } from '../entities/debt.entity';
import { SupplierMapper } from 'src/suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';

export class DebtMapper {
  static toDomain(raw: DebtEntity): Debt {
    const domainEntity = new Debt();
    if (raw.consignee) {
      domainEntity.consignee = ConsigneeMapper.toDomain(raw.consignee);
    } else if (raw.consignee === null) {
      domainEntity.consignee = null;
    }

    if (raw.supplier) {
      domainEntity.supplier = SupplierMapper.toDomain(raw.supplier);
    } else if (raw.supplier === null) {
      domainEntity.supplier = null;
    }

    domainEntity.partnerType = raw.partnerType;

    domainEntity.status = raw.status;

    domainEntity.dueDate = raw.dueDate;

    domainEntity.creditLimit = raw.creditLimit;

    domainEntity.remainingAmount = raw.remainingAmount;

    domainEntity.paidAmount = raw.paidAmount;

    domainEntity.originalAmount = raw.originalAmount;

    domainEntity.debtType = raw.debtType;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Debt): DebtEntity {
    const persistenceEntity = new DebtEntity();
    if (domainEntity.consignee) {
      persistenceEntity.consignee = ConsigneeMapper.toPersistence(
        domainEntity.consignee,
      );
    } else if (domainEntity.consignee === null) {
      persistenceEntity.consignee = null;
    }

    if (domainEntity.supplier) {
      persistenceEntity.supplier = SupplierMapper.toPersistence(
        domainEntity.supplier,
      );
    } else if (domainEntity.supplier === null) {
      persistenceEntity.supplier = null;
    }

    persistenceEntity.partnerType = domainEntity.partnerType;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.dueDate = domainEntity.dueDate;

    persistenceEntity.creditLimit = domainEntity.creditLimit;

    persistenceEntity.remainingAmount = domainEntity.remainingAmount;

    persistenceEntity.paidAmount = domainEntity.paidAmount;

    persistenceEntity.originalAmount = domainEntity.originalAmount;

    persistenceEntity.debtType = domainEntity.debtType;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
