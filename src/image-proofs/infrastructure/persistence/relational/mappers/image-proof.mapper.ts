import { ImageProof } from '../../../../domain/image-proof';

import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';

import { HarvestPhaseMapper } from 'src/harvest-phases/infrastructure/persistence/relational/mappers/harvest-phase.mapper';
import { ImageProofResponse } from 'src/image-proofs/dto/image-proof-response.dto';
import { OrderPhaseMapper } from 'src/order-phases/infrastructure/persistence/relational/mappers/order-phase.mapper';
import { ImageProofEntity } from '../entities/image-proof.entity';

export class ImageProofMapper {
  static toDomain(raw: ImageProofEntity): ImageProof {
    const domainEntity = new ImageProof();
    if (raw.orderPhase) {
      domainEntity.orderPhase = OrderPhaseMapper.toDomain(raw.orderPhase);
    }

    if (raw.harvestPhase) {
      domainEntity.harvestPhase = HarvestPhaseMapper.toDomain(raw.harvestPhase);
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
    if (domainEntity.orderPhase) {
      persistenceEntity.orderPhase = OrderPhaseMapper.toPersistence(
        domainEntity.orderPhase,
      );
    }

    if (domainEntity.harvestPhase) {
      persistenceEntity.harvestPhase = HarvestPhaseMapper.toPersistence(
        domainEntity.harvestPhase,
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

  static toResponse(raw: ImageProofEntity): ImageProofResponse {
    const domainEntity = new ImageProofResponse();

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
}
