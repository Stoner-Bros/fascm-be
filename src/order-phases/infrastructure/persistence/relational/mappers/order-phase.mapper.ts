import { OrderPhase } from '../../../../domain/order-phase';

import { OrderScheduleMapper } from '../../../../../order-schedules/infrastructure/persistence/relational/mappers/order-schedule.mapper';

import { ImageProofMapper } from 'src/image-proofs/infrastructure/persistence/relational/mappers/image-proof.mapper';
import { OrderPhaseEntity } from '../entities/order-phase.entity';

export class OrderPhaseMapper {
  static toDomain(raw: OrderPhaseEntity): OrderPhase {
    const domainEntity = new OrderPhase();
    domainEntity.description = raw.description;

    domainEntity.status = raw.status;

    domainEntity.phaseNumber = raw.phaseNumber;

    if (raw.imageProof) {
      domainEntity.imageProof = raw.imageProof.map((item) =>
        ImageProofMapper.toDomain(item),
      );
    } else if (raw.imageProof === null) {
      domainEntity.imageProof = null;
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

  static toPersistence(domainEntity: OrderPhase): OrderPhaseEntity {
    const persistenceEntity = new OrderPhaseEntity();
    persistenceEntity.description = domainEntity.description;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.phaseNumber = domainEntity.phaseNumber;

    if (domainEntity.imageProof) {
      persistenceEntity.imageProof = domainEntity.imageProof.map((item) =>
        ImageProofMapper.toPersistence(item),
      );
    } else if (domainEntity.imageProof === null) {
      persistenceEntity.imageProof = null;
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
