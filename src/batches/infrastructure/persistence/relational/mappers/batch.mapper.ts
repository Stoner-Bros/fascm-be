import { Batch } from '../../../../domain/batch';
import { OrderDetailMapper } from '../../../../../order-details/infrastructure/persistence/relational/mappers/order-detail.mapper';

import { AreaMapper } from '../../../../../areas/infrastructure/persistence/relational/mappers/area.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { ImportTicketMapper } from '../../../../../import-tickets/infrastructure/persistence/relational/mappers/import-ticket.mapper';

import { BatchEntity } from '../entities/batch.entity';

export class BatchMapper {
  static toDomain(raw: BatchEntity): Batch {
    const domainEntity = new Batch();
    if (raw.orderDetail) {
      domainEntity.orderDetail = OrderDetailMapper.toDomain(raw.orderDetail);
    } else if (raw.orderDetail === null) {
      domainEntity.orderDetail = null;
    }

    domainEntity.volume = raw.volume;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    domainEntity.batchCode = raw.batchCode;

    if (raw.area) {
      domainEntity.area = AreaMapper.toDomain(raw.area);
    } else if (raw.area === null) {
      domainEntity.area = null;
    }

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    if (raw.importTicket) {
      domainEntity.importTicket = ImportTicketMapper.toDomain(raw.importTicket);
    } else if (raw.importTicket === null) {
      domainEntity.importTicket = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Batch): BatchEntity {
    const persistenceEntity = new BatchEntity();
    if (domainEntity.orderDetail) {
      persistenceEntity.orderDetail = OrderDetailMapper.toPersistence(
        domainEntity.orderDetail,
      );
    } else if (domainEntity.orderDetail === null) {
      persistenceEntity.orderDetail = null;
    }

    persistenceEntity.volume = domainEntity.volume;

    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.batchCode = domainEntity.batchCode;

    if (domainEntity.area) {
      persistenceEntity.area = AreaMapper.toPersistence(domainEntity.area);
    } else if (domainEntity.area === null) {
      persistenceEntity.area = null;
    }

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    } else if (domainEntity.product === null) {
      persistenceEntity.product = null;
    }

    if (domainEntity.importTicket) {
      persistenceEntity.importTicket = ImportTicketMapper.toPersistence(
        domainEntity.importTicket,
      );
    } else if (domainEntity.importTicket === null) {
      persistenceEntity.importTicket = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
