import { AreaAlert } from '../../../../domain/area-alert';

import { AreaMapper } from '../../../../../areas/infrastructure/persistence/relational/mappers/area.mapper';

import { AreaAlertEntity } from '../entities/area-alert.entity';

export class AreaAlertMapper {
  static toDomain(raw: AreaAlertEntity): AreaAlert {
    const domainEntity = new AreaAlert();
    domainEntity.status = raw.status;

    domainEntity.message = raw.message;

    domainEntity.alertType = raw.alertType;

    if (raw.area) {
      domainEntity.area = AreaMapper.toDomain(raw.area);
    } else if (raw.area === null) {
      domainEntity.area = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: AreaAlert): AreaAlertEntity {
    const persistenceEntity = new AreaAlertEntity();
    persistenceEntity.status = domainEntity.status;

    persistenceEntity.message = domainEntity.message;

    persistenceEntity.alertType = domainEntity.alertType;

    if (domainEntity.area) {
      persistenceEntity.area = AreaMapper.toPersistence(domainEntity.area);
    } else if (domainEntity.area === null) {
      persistenceEntity.area = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
