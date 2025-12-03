import { OrderSchedule } from '../../../../domain/order-schedule';
import { ImageProofMapper } from '../../../../../image-proofs/infrastructure/persistence/relational/mappers/image-proof.mapper';

import { ConsigneeMapper } from '../../../../../consignees/infrastructure/persistence/relational/mappers/consignee.mapper';

import { OrderScheduleEntity } from '../entities/order-schedule.entity';

export class OrderScheduleMapper {
  static toDomain(raw: OrderScheduleEntity): OrderSchedule {
    const domainEntity = new OrderSchedule();
    if (raw.imageProof) {
      domainEntity.imageProof = raw.imageProof.map((item) =>
        ImageProofMapper.toDomain(item),
      );
    } else if (raw.imageProof === null) {
      domainEntity.imageProof = null;
    }

    domainEntity.address = raw.address;

    domainEntity.description = raw.description;

    domainEntity.status = raw.status;

    domainEntity.deliveryDate = raw.deliveryDate;

    if (raw.consignee) {
      domainEntity.consignee = ConsigneeMapper.toDomain(raw.consignee);
    } else if (raw.consignee === null) {
      domainEntity.consignee = null;
    }

    domainEntity.id = raw.id;
    domainEntity.reason = raw.reason;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderSchedule): OrderScheduleEntity {
    const persistenceEntity = new OrderScheduleEntity();
    if (domainEntity.imageProof) {
      persistenceEntity.imageProof = domainEntity.imageProof.map((item) =>
        ImageProofMapper.toPersistence(item),
      );
    } else if (domainEntity.imageProof === null) {
      persistenceEntity.imageProof = null;
    }

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.deliveryDate = domainEntity.deliveryDate;

    if (domainEntity.consignee) {
      persistenceEntity.consignee = ConsigneeMapper.toPersistence(
        domainEntity.consignee,
      );
    } else if (domainEntity.consignee === null) {
      persistenceEntity.consignee = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.reason = domainEntity.reason;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
