import { OrderDetail } from '../../../../domain/order-detail';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { OrderMapper } from '../../../../../orders/infrastructure/persistence/relational/mappers/order.mapper';

import { OrderDetailEntity } from '../entities/order-detail.entity';

export class OrderDetailMapper {
  static toDomain(raw: OrderDetailEntity): OrderDetail {
    const domainEntity = new OrderDetail();
    domainEntity.taxRate = raw.taxRate;

    domainEntity.amount = raw.amount;

    domainEntity.unitPrice = raw.unitPrice;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    if (raw.order) {
      domainEntity.order = OrderMapper.toDomain(raw.order);
    } else if (raw.order === null) {
      domainEntity.order = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderDetail): OrderDetailEntity {
    const persistenceEntity = new OrderDetailEntity();
    persistenceEntity.taxRate = domainEntity.taxRate;

    persistenceEntity.amount = domainEntity.amount;

    persistenceEntity.unitPrice = domainEntity.unitPrice;

    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    } else if (domainEntity.product === null) {
      persistenceEntity.product = null;
    }

    if (domainEntity.order) {
      persistenceEntity.order = OrderMapper.toPersistence(domainEntity.order);
    } else if (domainEntity.order === null) {
      persistenceEntity.order = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
