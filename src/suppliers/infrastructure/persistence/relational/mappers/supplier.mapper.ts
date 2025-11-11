import { Supplier } from '../../../../domain/supplier';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SupplierEntity } from '../entities/supplier.entity';

export class SupplierMapper {
  static toDomain(raw: SupplierEntity): Supplier {
    const domainEntity = new Supplier();
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.contact = raw.contact;

    domainEntity.taxCode = raw.taxCode;

    domainEntity.address = raw.address;

    domainEntity.certificate = raw.certificate;

    domainEntity.qrCode = raw.qrCode;

    domainEntity.gardenName = raw.gardenName;

    domainEntity.representativeName = raw.representativeName;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Supplier): SupplierEntity {
    const persistenceEntity = new SupplierEntity();
    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }

    persistenceEntity.contact = domainEntity.contact;

    persistenceEntity.taxCode = domainEntity.taxCode;

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.certificate = domainEntity.certificate;

    persistenceEntity.qrCode = domainEntity.qrCode;

    persistenceEntity.gardenName = domainEntity.gardenName;

    persistenceEntity.representativeName = domainEntity.representativeName;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
