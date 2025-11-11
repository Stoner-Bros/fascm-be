import { DeliveryStaff } from '../../../../domain/delivery-staff';
import { TruckMapper } from '../../../../../trucks/infrastructure/persistence/relational/mappers/truck.mapper';

import { WarehouseMapper } from '../../../../../warehouses/infrastructure/persistence/relational/mappers/warehouse.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { DeliveryStaffEntity } from '../entities/delivery-staff.entity';

export class DeliveryStaffMapper {
  static toDomain(raw: DeliveryStaffEntity): DeliveryStaff {
    const domainEntity = new DeliveryStaff();
    if (raw.truck) {
      domainEntity.truck = TruckMapper.toDomain(raw.truck);
    } else if (raw.truck === null) {
      domainEntity.truck = null;
    }

    if (raw.warehouse) {
      domainEntity.warehouse = WarehouseMapper.toDomain(raw.warehouse);
    } else if (raw.warehouse === null) {
      domainEntity.warehouse = null;
    }

    domainEntity.licenseExpiredAt = raw.licenseExpiredAt;

    domainEntity.licensePhoto = raw.licensePhoto;

    domainEntity.licenseNumber = raw.licenseNumber;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: DeliveryStaff): DeliveryStaffEntity {
    const persistenceEntity = new DeliveryStaffEntity();
    if (domainEntity.truck) {
      persistenceEntity.truck = TruckMapper.toPersistence(domainEntity.truck);
    } else if (domainEntity.truck === null) {
      persistenceEntity.truck = null;
    }

    if (domainEntity.warehouse) {
      persistenceEntity.warehouse = WarehouseMapper.toPersistence(
        domainEntity.warehouse,
      );
    } else if (domainEntity.warehouse === null) {
      persistenceEntity.warehouse = null;
    }

    persistenceEntity.licenseExpiredAt = domainEntity.licenseExpiredAt;

    persistenceEntity.licensePhoto = domainEntity.licensePhoto;

    persistenceEntity.licenseNumber = domainEntity.licenseNumber;

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
