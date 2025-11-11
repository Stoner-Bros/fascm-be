import { Staff } from '../../../../domain/staff';
import { WarehouseMapper } from '../../../../../warehouses/infrastructure/persistence/relational/mappers/warehouse.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { StaffEntity } from '../entities/staff.entity';

export class StaffMapper {
  static toDomain(raw: StaffEntity): Staff {
    const domainEntity = new Staff();
    if (raw.warehouse) {
      domainEntity.warehouse = WarehouseMapper.toDomain(raw.warehouse);
    } else if (raw.warehouse === null) {
      domainEntity.warehouse = null;
    }

    domainEntity.position = raw.position;

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

  static toPersistence(domainEntity: Staff): StaffEntity {
    const persistenceEntity = new StaffEntity();
    if (domainEntity.warehouse) {
      persistenceEntity.warehouse = WarehouseMapper.toPersistence(
        domainEntity.warehouse,
      );
    } else if (domainEntity.warehouse === null) {
      persistenceEntity.warehouse = null;
    }

    persistenceEntity.position = domainEntity.position;

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
