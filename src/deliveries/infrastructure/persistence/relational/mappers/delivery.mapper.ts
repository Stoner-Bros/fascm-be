import { Delivery } from '../../../../domain/delivery';

import { TruckMapper } from '../../../../../trucks/infrastructure/persistence/relational/mappers/truck.mapper';

import { DeliveryStaffMapper } from 'src/delivery-staffs/infrastructure/persistence/relational/mappers/delivery-staff.mapper';
import { HarvestPhaseMapper } from 'src/harvest-phases/infrastructure/persistence/relational/mappers/harvest-phase.mapper';
import { OrderPhaseMapper } from 'src/order-phases/infrastructure/persistence/relational/mappers/order-phase.mapper';
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

    if (raw.deliveryStaff) {
      domainEntity.deliveryStaff = DeliveryStaffMapper.toDomain(
        raw.deliveryStaff,
      );
    } else if (raw.deliveryStaff === null) {
      domainEntity.deliveryStaff = null;
    }

    if (raw.harvestPhase) {
      domainEntity.harvestPhase = HarvestPhaseMapper.toDomain(raw.harvestPhase);
    } else if (raw.harvestPhase === null) {
      domainEntity.harvestPhase = null;
    }

    if (raw.orderPhase) {
      domainEntity.orderPhase = OrderPhaseMapper.toDomain(raw.orderPhase);
    } else if (raw.orderPhase === null) {
      domainEntity.orderPhase = null;
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

    if (domainEntity.deliveryStaff) {
      persistenceEntity.deliveryStaff = DeliveryStaffMapper.toPersistence(
        domainEntity.deliveryStaff,
      );
    } else if (domainEntity.deliveryStaff === null) {
      persistenceEntity.deliveryStaff = null;
    }

    if (domainEntity.harvestPhase) {
      persistenceEntity.harvestPhase = HarvestPhaseMapper.toPersistence(
        domainEntity.harvestPhase,
      );
    } else if (domainEntity.harvestPhase === null) {
      persistenceEntity.harvestPhase = null;
    }

    if (domainEntity.orderPhase) {
      persistenceEntity.orderPhase = OrderPhaseMapper.toPersistence(
        domainEntity.orderPhase,
      );
    } else if (domainEntity.orderPhase === null) {
      persistenceEntity.orderPhase = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
