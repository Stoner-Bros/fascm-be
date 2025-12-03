import { Truck } from '../../../../domain/truck';

import { IoTDeviceMapper } from '../../../../../io-t-devices/infrastructure/persistence/relational/mappers/io-t-device.mapper';

import { TruckEntity } from '../entities/truck.entity';
import { TruckStatusEnum } from '../../../../enum/truck-status.enum';

export class TruckMapper {
  static toDomain(raw: TruckEntity): Truck {
    const domainEntity = new Truck();
    domainEntity.status = raw.status as TruckStatusEnum;

    domainEntity.currentLocation = raw.currentLocation;

    domainEntity.model = raw.model;

    domainEntity.licensePhoto = raw.licensePhoto;

    domainEntity.licensePlate = raw.licensePlate;

    domainEntity.capacity = raw.capacity;

    if (raw.iotDevice) {
      domainEntity.iotDevice = raw.iotDevice.map((item) =>
        IoTDeviceMapper.toDomain(item),
      );
    } else if (raw.iotDevice === null) {
      domainEntity.iotDevice = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Truck): TruckEntity {
    const persistenceEntity = new TruckEntity();
    persistenceEntity.status = domainEntity.status as TruckStatusEnum;

    persistenceEntity.currentLocation = domainEntity.currentLocation;

    persistenceEntity.model = domainEntity.model;

    persistenceEntity.licensePhoto = domainEntity.licensePhoto;

    persistenceEntity.licensePlate = domainEntity.licensePlate;

    persistenceEntity.capacity = domainEntity.capacity;

    if (domainEntity.iotDevice) {
      persistenceEntity.iotDevice = domainEntity.iotDevice.map((item) =>
        IoTDeviceMapper.toPersistence(item),
      );
    } else if (domainEntity.iotDevice === null) {
      persistenceEntity.iotDevice = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
