import { Product } from '../../../../domain/product';

import { CategoryMapper } from '../../../../../categories/infrastructure/persistence/relational/mappers/category.mapper';

import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const domainEntity = new Product();
    domainEntity.pricePerKg = raw.pricePerKg;

    domainEntity.image = raw.image;

    if (raw.categoryId) {
      domainEntity.categoryId = CategoryMapper.toDomain(raw.categoryId);
    } else if (raw.categoryId === null) {
      domainEntity.categoryId = null;
    }

    domainEntity.status = raw.status;

    domainEntity.minStorageHumidity = raw.minStorageHumidity;
    domainEntity.maxStorageHumidity = raw.maxStorageHumidity;

    domainEntity.minStorageTemperature = raw.minStorageTemperature;
    domainEntity.maxStorageTemperature = raw.maxStorageTemperature;

    domainEntity.description = raw.description;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();
    persistenceEntity.pricePerKg = domainEntity.pricePerKg;

    persistenceEntity.image = domainEntity.image;

    if (domainEntity.categoryId) {
      persistenceEntity.categoryId = CategoryMapper.toPersistence(
        domainEntity.categoryId,
      );
    } else if (domainEntity.categoryId === null) {
      persistenceEntity.categoryId = null;
    }

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.minStorageHumidity = domainEntity.minStorageHumidity;
    persistenceEntity.maxStorageHumidity = domainEntity.maxStorageHumidity;

    persistenceEntity.minStorageTemperature =
      domainEntity.minStorageTemperature;
    persistenceEntity.minStorageTemperature =
      domainEntity.minStorageTemperature;

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
