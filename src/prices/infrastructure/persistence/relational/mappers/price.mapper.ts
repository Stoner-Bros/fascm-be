import { Price } from '../../../../domain/price';

import { BatchMapper } from 'src/batches/infrastructure/persistence/relational/mappers/batch.mapper';
import { PriceEntity } from '../entities/price.entity';

export class PriceMapper {
  static toDomain(raw: PriceEntity): Price {
    const domainEntity = new Price();
    if (raw.batch) {
      domainEntity.batch = BatchMapper.toDomain(raw.batch);
    }

    domainEntity.price = raw.price;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Price): PriceEntity {
    const persistenceEntity = new PriceEntity();
    if (domainEntity.batch) {
      persistenceEntity.batch = BatchMapper.toPersistence(domainEntity.batch);
    }

    persistenceEntity.price = domainEntity.price;

    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
