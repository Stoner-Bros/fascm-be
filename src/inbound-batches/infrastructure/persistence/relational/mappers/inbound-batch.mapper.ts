import { InboundBatch } from '../../../../domain/inbound-batch';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { HarvestDetailMapper } from '../../../../../harvest-details/infrastructure/persistence/relational/mappers/harvest-detail.mapper';

import { InboundBatchEntity } from '../entities/inbound-batch.entity';

export class InboundBatchMapper {
  static toDomain(raw: InboundBatchEntity): InboundBatch {
    const domainEntity = new InboundBatch();
    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    domainEntity.batchCode = raw.batchCode;

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    if (raw.harvestDetail) {
      domainEntity.harvestDetail = HarvestDetailMapper.toDomain(
        raw.harvestDetail,
      );
    } else if (raw.harvestDetail === null) {
      domainEntity.harvestDetail = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: InboundBatch): InboundBatchEntity {
    const persistenceEntity = new InboundBatchEntity();
    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.batchCode = domainEntity.batchCode;

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    } else if (domainEntity.product === null) {
      persistenceEntity.product = null;
    }

    if (domainEntity.harvestDetail) {
      persistenceEntity.harvestDetail = HarvestDetailMapper.toPersistence(
        domainEntity.harvestDetail,
      );
    } else if (domainEntity.harvestDetail === null) {
      persistenceEntity.harvestDetail = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
