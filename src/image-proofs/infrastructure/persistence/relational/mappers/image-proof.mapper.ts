import { ImageProof } from '../../../../domain/image-proof';
import { OrderScheduleMapper } from '../../../../../order-schedules/infrastructure/persistence/relational/mappers/order-schedule.mapper';

import { HarvestScheduleMapper } from '../../../../../harvest-schedules/infrastructure/persistence/relational/mappers/harvest-schedule.mapper';

import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';

import { ImageProofEntity } from '../entities/image-proof.entity';

export class ImageProofMapper {
  static toDomain(raw: ImageProofEntity): ImageProof {
    const domainEntity = new ImageProof();
    if (raw.orderSchedule) {
      domainEntity.orderSchedule = OrderScheduleMapper.toDomain(
        raw.orderSchedule,
      );
    }

    if (raw.harvestSchedule) {
      domainEntity.harvestSchedule = HarvestScheduleMapper.toDomain(
        raw.harvestSchedule,
      );
    }

    if (raw.photo) {
      domainEntity.photo = FileMapper.toDomain(raw.photo);
    } else if (raw.photo === null) {
      domainEntity.photo = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ImageProof): ImageProofEntity {
    const persistenceEntity = new ImageProofEntity();
    if (domainEntity.orderSchedule) {
      persistenceEntity.orderSchedule = OrderScheduleMapper.toPersistence(
        domainEntity.orderSchedule,
      );
    }

    if (domainEntity.harvestSchedule) {
      persistenceEntity.harvestSchedule = HarvestScheduleMapper.toPersistence(
        domainEntity.harvestSchedule,
      );
    }

    if (domainEntity.photo) {
      persistenceEntity.photo = FileMapper.toPersistence(domainEntity.photo);
    } else if (domainEntity.photo === null) {
      persistenceEntity.photo = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
