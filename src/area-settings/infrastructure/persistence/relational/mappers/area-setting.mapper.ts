import { AreaSetting } from '../../../../domain/area-setting';

import { AreaMapper } from '../../../../../areas/infrastructure/persistence/relational/mappers/area.mapper';

import { AreaSettingEntity } from '../entities/area-setting.entity';

export class AreaSettingMapper {
  static toDomain(raw: AreaSettingEntity): AreaSetting {
    const domainEntity = new AreaSetting();
    domainEntity.minStock = raw.minStock;

    domainEntity.minHumidity = raw.minHumidity;

    domainEntity.maxHumidity = raw.maxHumidity;

    domainEntity.minTemperature = raw.minTemperature;

    domainEntity.maxTemperature = raw.maxTemperature;

    if (raw.area) {
      domainEntity.area = AreaMapper.toDomain(raw.area);
    } else if (raw.area === null) {
      domainEntity.area = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: AreaSetting): AreaSettingEntity {
    const persistenceEntity = new AreaSettingEntity();
    persistenceEntity.minStock = domainEntity.minStock;

    persistenceEntity.minHumidity = domainEntity.minHumidity;
    persistenceEntity.maxHumidity = domainEntity.maxHumidity;

    persistenceEntity.minTemperature = domainEntity.minTemperature;

    persistenceEntity.maxTemperature = domainEntity.maxTemperature;
    if (domainEntity.area) {
      persistenceEntity.area = AreaMapper.toPersistence(domainEntity.area);
    } else if (domainEntity.area === null) {
      persistenceEntity.area = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
