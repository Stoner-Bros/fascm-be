import { OrderDetail } from '../../../../domain/order-detail';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { OrderMapper } from '../../../../../orders/infrastructure/persistence/relational/mappers/order.mapper';

import { OrderDetailSelectionMapper } from '../../../../../order-detail-selections/infrastructure/persistence/relational/mappers/order-detail-selection.mapper';
import { OrderDetailResponseDto } from 'src/order-details/dto/order-detail-response.dto';
import { OrderDetailEntity } from '../entities/order-detail.entity';

export class OrderDetailMapper {
  static toDomain(raw: OrderDetailEntity): OrderDetail {
    const domainEntity = new OrderDetail();
    domainEntity.amount = raw.amount;

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

  static toResponseDto(raw: OrderDetailEntity): OrderDetailResponseDto {
    const domainEntity = new OrderDetailResponseDto();
    domainEntity.amount = raw.amount;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    if (raw.product) {
      domainEntity.product = ProductMapper.toResponse(raw.product);
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    // Map orderDetailSelections
    if (raw.orderDetailSelections && Array.isArray(raw.orderDetailSelections)) {
      domainEntity.orderDetailSelections = raw.orderDetailSelections.map(
        (selection) => OrderDetailSelectionMapper.toResponse(selection),
      );
    } else {
      domainEntity.orderDetailSelections = [];
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderDetail): OrderDetailEntity {
    const persistenceEntity = new OrderDetailEntity();
    persistenceEntity.amount = domainEntity.amount;

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
