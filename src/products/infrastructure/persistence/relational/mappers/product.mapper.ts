import { Product } from '../../../../domain/product';
import { PriceMapper } from '../../../../../prices/infrastructure/persistence/relational/mappers/price.mapper';

import { CategoryMapper } from '../../../../../categories/infrastructure/persistence/relational/mappers/category.mapper';

import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const domainEntity = new Product();
    if (raw.price) {
      domainEntity.price = raw.price.map((item) => PriceMapper.toDomain(item));
    } else if (raw.price === null) {
      domainEntity.price = null;
    }

    domainEntity.image = raw.image;

    if (raw.category) {
      domainEntity.category = CategoryMapper.toDomain(raw.category);
    } else if (raw.category === null) {
      domainEntity.category = null;
    }

    domainEntity.status = raw.status;

    domainEntity.description = raw.description;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();
    if (domainEntity.price) {
      persistenceEntity.price = domainEntity.price.map((item) =>
        PriceMapper.toPersistence(item),
      );
    } else if (domainEntity.price === null) {
      persistenceEntity.price = null;
    }

    persistenceEntity.image = domainEntity.image;

    if (domainEntity.category) {
      persistenceEntity.category = CategoryMapper.toPersistence(
        domainEntity.category,
      );
    } else if (domainEntity.category === null) {
      persistenceEntity.category = null;
    }

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
