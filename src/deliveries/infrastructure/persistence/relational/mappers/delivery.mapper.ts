import { Delivery } from '../../../../domain/delivery';

import { TruckMapper } from '../../../../../trucks/infrastructure/persistence/relational/mappers/truck.mapper';

import { HarvestScheduleMapper } from '../../../../../harvest-schedules/infrastructure/persistence/relational/mappers/harvest-schedule.mapper';

import { OrderScheduleMapper } from '../../../../../order-schedules/infrastructure/persistence/relational/mappers/order-schedule.mapper';

import { DeliveryEntity } from '../entities/delivery.entity';

export class DeliveryMapper {
  static toDomain(raw: DeliveryEntity): Delivery {
    const domainEntity = new Delivery();
    domainEntity.endLng = raw.endLng;

    domainEntity.endLat = raw.endLat;

    domainEntity.startLng = raw.startLng;

    domainEntity.startLat = raw.startLat;

    domainEntity.endAddress = raw.endAddress;

    domainEntity.startAddress = raw.startAddress;

    domainEntity.status = raw.status;

    domainEntity.endTime = raw.endTime;

    domainEntity.startTime = raw.startTime;

    if (raw.truck) {
      domainEntity.truck = TruckMapper.toDomain(raw.truck);
    } else if (raw.truck === null) {
      domainEntity.truck = null;
    }

    if (raw.harvestSchedule) {
      domainEntity.harvestSchedule = HarvestScheduleMapper.toDomain(
        raw.harvestSchedule,
      );
    } else if (raw.harvestSchedule === null) {
      domainEntity.harvestSchedule = null;
    }

    if (raw.orderSchedule) {
      domainEntity.orderSchedule = OrderScheduleMapper.toDomain(
        raw.orderSchedule,
      );
    } else if (raw.orderSchedule === null) {
      domainEntity.orderSchedule = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Delivery): DeliveryEntity {
    const persistenceEntity = new DeliveryEntity();
    persistenceEntity.endLng = domainEntity.endLng;

    persistenceEntity.endLat = domainEntity.endLat;

    persistenceEntity.startLng = domainEntity.startLng;

    persistenceEntity.startLat = domainEntity.startLat;

    persistenceEntity.endAddress = domainEntity.endAddress;

    persistenceEntity.startAddress = domainEntity.startAddress;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.endTime = domainEntity.endTime;

    persistenceEntity.startTime = domainEntity.startTime;

    if (domainEntity.truck) {
      persistenceEntity.truck = TruckMapper.toPersistence(domainEntity.truck);
    } else if (domainEntity.truck === null) {
      persistenceEntity.truck = null;
    }

    if (domainEntity.harvestSchedule) {
      persistenceEntity.harvestSchedule = HarvestScheduleMapper.toPersistence(
        domainEntity.harvestSchedule,
      );
    } else if (domainEntity.harvestSchedule === null) {
      persistenceEntity.harvestSchedule = null;
    }

    if (domainEntity.orderSchedule) {
      persistenceEntity.orderSchedule = OrderScheduleMapper.toPersistence(
        domainEntity.orderSchedule,
      );
    } else if (domainEntity.orderSchedule === null) {
      persistenceEntity.orderSchedule = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
