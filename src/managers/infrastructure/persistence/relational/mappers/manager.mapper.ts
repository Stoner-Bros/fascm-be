import { Manager } from '../../../../domain/manager';
import { WarehouseMapper } from '../../../../../warehouses/infrastructure/persistence/relational/mappers/warehouse.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { ManagerEntity } from '../entities/manager.entity';

export class ManagerMapper {
  static toDomain(raw: ManagerEntity): Manager {
    const domainEntity = new Manager();
    if (raw.warehouse) {
      domainEntity.warehouse = WarehouseMapper.toDomain(raw.warehouse);
    } else if (raw.warehouse === null) {
      domainEntity.warehouse = null;
    }

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

  static toPersistence(domainEntity: Manager): ManagerEntity {
    const persistenceEntity = new ManagerEntity();
    if (domainEntity.warehouse) {
      persistenceEntity.warehouse = WarehouseMapper.toPersistence(
        domainEntity.warehouse,
      );
    } else if (domainEntity.warehouse === null) {
      persistenceEntity.warehouse = null;
    }

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
