import { TruckSetting } from '../../../../domain/truck-setting';
import { TruckMapper } from '../../../../../trucks/infrastructure/persistence/relational/mappers/truck.mapper';
import { TruckSettingEntity } from '../entities/truck-setting.entity';

export class TruckSettingMapper {
  static toDomain(raw: TruckSettingEntity): TruckSetting {
    const domainEntity = new TruckSetting();

    domainEntity.minHumidity = raw.minHumidity;
    domainEntity.maxHumidity = raw.maxHumidity;
    domainEntity.minTemperature = raw.minTemperature;
    domainEntity.maxTemperature = raw.maxTemperature;

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

  static toPersistence(domainEntity: TruckSetting): TruckSettingEntity {
    const persistenceEntity = new TruckSettingEntity();

    persistenceEntity.minHumidity = domainEntity.minHumidity;
    persistenceEntity.maxHumidity = domainEntity.maxHumidity;
    persistenceEntity.minTemperature = domainEntity.minTemperature;
    persistenceEntity.maxTemperature = domainEntity.maxTemperature;

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
