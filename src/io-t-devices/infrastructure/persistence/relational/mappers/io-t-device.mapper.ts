import { IoTDevice } from '../../../../domain/io-t-device';
import { TruckMapper } from '../../../../../trucks/infrastructure/persistence/relational/mappers/truck.mapper';

import { AreaMapper } from '../../../../../areas/infrastructure/persistence/relational/mappers/area.mapper';

import { IoTDeviceEntity } from '../entities/io-t-device.entity';

export class IoTDeviceMapper {
  static toDomain(raw: IoTDeviceEntity): IoTDevice {
    const domainEntity = new IoTDevice();
    if (raw.truck) {
      domainEntity.truck = TruckMapper.toDomain(raw.truck);
    }

    if (raw.area) {
      domainEntity.area = AreaMapper.toDomain(raw.area);
    }

    domainEntity.status = raw.status;

    domainEntity.data = raw.data;

    domainEntity.lastDataTime = raw.lastDataTime;

    domainEntity.type = raw.type;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: IoTDevice): IoTDeviceEntity {
    const persistenceEntity = new IoTDeviceEntity();
    if (domainEntity.truck) {
      persistenceEntity.truck = TruckMapper.toPersistence(domainEntity.truck);
    }

    if (domainEntity.area) {
      persistenceEntity.area = AreaMapper.toPersistence(domainEntity.area);
    }

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.data = domainEntity.data;

    persistenceEntity.lastDataTime = domainEntity.lastDataTime;

    persistenceEntity.type = domainEntity.type;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
