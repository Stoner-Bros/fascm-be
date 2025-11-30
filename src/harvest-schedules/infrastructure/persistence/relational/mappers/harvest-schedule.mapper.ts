import { HarvestSchedule } from '../../../../domain/harvest-schedule';

import { SupplierMapper } from '../../../../../suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';

import { HarvestScheduleEntity } from '../entities/harvest-schedule.entity';

export class HarvestScheduleMapper {
  static toDomain(raw: HarvestScheduleEntity): HarvestSchedule {
    const domainEntity = new HarvestSchedule();
    domainEntity.address = raw.address;

    domainEntity.description = raw.description;

    domainEntity.status = raw.status;

    domainEntity.harvestDate = raw.harvestDate;

    if (raw.supplierId) {
      domainEntity.supplierId = SupplierMapper.toDomain(raw.supplierId);
    } else if (raw.supplierId === null) {
      domainEntity.supplierId = null;
    }

    domainEntity.id = raw.id;
    domainEntity.reason = raw.reason;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: HarvestSchedule): HarvestScheduleEntity {
    const persistenceEntity = new HarvestScheduleEntity();
    persistenceEntity.address = domainEntity.address;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.harvestDate = domainEntity.harvestDate;

    if (domainEntity.supplierId) {
      persistenceEntity.supplierId = SupplierMapper.toPersistence(
        domainEntity.supplierId,
      );
    } else if (domainEntity.supplierId === null) {
      persistenceEntity.supplierId = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
