import { Area } from '../../../../domain/area';
import { IoTDeviceMapper } from '../../../../../io-t-devices/infrastructure/persistence/relational/mappers/io-t-device.mapper';

import { WarehouseMapper } from '../../../../../warehouses/infrastructure/persistence/relational/mappers/warehouse.mapper';

import { AreaEntity } from '../entities/area.entity';

export class AreaMapper {
  static toDomain(raw: AreaEntity): Area {
    const domainEntity = new Area();
    if (raw.iotDevice) {
      domainEntity.iotDevice = raw.iotDevice.map((item) =>
        IoTDeviceMapper.toDomain(item),
      );
    } else if (raw.iotDevice === null) {
      domainEntity.iotDevice = null;
    }

    domainEntity.description = raw.description;

    domainEntity.volumne = raw.volumne;

    domainEntity.location = raw.location;

    domainEntity.name = raw.name;

    if (raw.warehouse) {
      domainEntity.warehouse = WarehouseMapper.toDomain(raw.warehouse);
    } else if (raw.warehouse === null) {
      domainEntity.warehouse = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Area): AreaEntity {
    const persistenceEntity = new AreaEntity();
    if (domainEntity.iotDevice) {
      persistenceEntity.iotDevice = domainEntity.iotDevice.map((item) =>
        IoTDeviceMapper.toPersistence(item),
      );
    } else if (domainEntity.iotDevice === null) {
      persistenceEntity.iotDevice = null;
    }

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.volumne = domainEntity.volumne;

    persistenceEntity.location = domainEntity.location;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.warehouse) {
      persistenceEntity.warehouse = WarehouseMapper.toPersistence(
        domainEntity.warehouse,
      );
    } else if (domainEntity.warehouse === null) {
      persistenceEntity.warehouse = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
