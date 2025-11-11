import { Consignee } from '../../../../domain/consignee';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { ConsigneeEntity } from '../entities/consignee.entity';

export class ConsigneeMapper {
  static toDomain(raw: ConsigneeEntity): Consignee {
    const domainEntity = new Consignee();
    domainEntity.contact = raw.contact;

    domainEntity.taxCode = raw.taxCode;

    domainEntity.address = raw.address;

    domainEntity.certificate = raw.certificate;

    domainEntity.qrCode = raw.qrCode;

    domainEntity.organizationName = raw.organizationName;

    domainEntity.representativeName = raw.representativeName;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    } else if (raw.user === null) {
      domainEntity.user = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Consignee): ConsigneeEntity {
    const persistenceEntity = new ConsigneeEntity();
    persistenceEntity.contact = domainEntity.contact;

    persistenceEntity.taxCode = domainEntity.taxCode;

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.certificate = domainEntity.certificate;

    persistenceEntity.qrCode = domainEntity.qrCode;

    persistenceEntity.organizationName = domainEntity.organizationName;

    persistenceEntity.representativeName = domainEntity.representativeName;

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    } else if (domainEntity.user === null) {
      persistenceEntity.user = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
