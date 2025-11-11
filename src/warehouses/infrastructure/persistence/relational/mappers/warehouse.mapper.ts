import { Warehouse } from '../../../../domain/warehouse';

import { WarehouseEntity } from '../entities/warehouse.entity';

export class WarehouseMapper {
  static toDomain(raw: WarehouseEntity): Warehouse {
    const domainEntity = new Warehouse();
    domainEntity.address = raw.address;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Warehouse): WarehouseEntity {
    const persistenceEntity = new WarehouseEntity();
    persistenceEntity.address = domainEntity.address;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
