import { TruckAlert } from '../../../../domain/truck-alert';
import { TruckMapper } from '../../../../../trucks/infrastructure/persistence/relational/mappers/truck.mapper';
import { TruckAlertEntity } from '../entities/truck-alert.entity';

export class TruckAlertMapper {
  static toDomain(raw: TruckAlertEntity): TruckAlert {
    const domainEntity = new TruckAlert();

    domainEntity.status = raw.status;
    domainEntity.message = raw.message;
    domainEntity.alertType = raw.alertType;

    if (raw.truck) {
      domainEntity.truck = TruckMapper.toDomain(raw.truck);
    } else if (raw.truck === null) {
      domainEntity.truck = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: TruckAlert): TruckAlertEntity {
    const persistenceEntity = new TruckAlertEntity();

    persistenceEntity.status = domainEntity.status;
    persistenceEntity.message = domainEntity.message;
    persistenceEntity.alertType = domainEntity.alertType;

    if (domainEntity.truck) {
      persistenceEntity.truck = TruckMapper.toPersistence(domainEntity.truck);
    } else if (domainEntity.truck === null) {
      persistenceEntity.truck = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
