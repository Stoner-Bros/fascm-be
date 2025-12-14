import { OrderDetailSelection } from '../../../../domain/order-detail-selection';
import { ExportTicketMapper } from '../../../../../export-tickets/infrastructure/persistence/relational/mappers/export-ticket.mapper';

import { BatchMapper } from '../../../../../batches/infrastructure/persistence/relational/mappers/batch.mapper';

import { OrderDetailMapper } from '../../../../../order-details/infrastructure/persistence/relational/mappers/order-detail.mapper';

import { OrderDetailSelectionEntity } from '../entities/order-detail-selection.entity';

export class OrderDetailSelectionMapper {
  static toDomain(raw: OrderDetailSelectionEntity): OrderDetailSelection {
    const domainEntity = new OrderDetailSelection();
    if (raw.exportTicket) {
      domainEntity.exportTicket = ExportTicketMapper.toDomain(raw.exportTicket);
    } else if (raw.exportTicket === null) {
      domainEntity.exportTicket = null;
    }

    if (raw.batch) {
      domainEntity.batch = BatchMapper.toDomain(raw.batch);
    } else if (raw.batch === null) {
      domainEntity.batch = null;
    }

    if (raw.orderDetail) {
      domainEntity.orderDetail = OrderDetailMapper.toDomain(raw.orderDetail);
    } else if (raw.orderDetail === null) {
      domainEntity.orderDetail = null;
    }

    domainEntity.quantity = raw.quantity;
    domainEntity.unitPrice = raw.unitPrice;
    domainEntity.unit = raw.unit;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: OrderDetailSelection,
  ): OrderDetailSelectionEntity {
    const persistenceEntity = new OrderDetailSelectionEntity();
    if (domainEntity.exportTicket) {
      persistenceEntity.exportTicket = ExportTicketMapper.toPersistence(
        domainEntity.exportTicket,
      );
    } else if (domainEntity.exportTicket === null) {
      persistenceEntity.exportTicket = null;
    }

    if (domainEntity.batch) {
      persistenceEntity.batch = BatchMapper.toPersistence(domainEntity.batch);
    } else if (domainEntity.batch === null) {
      persistenceEntity.batch = null;
    }

    if (domainEntity.orderDetail) {
      persistenceEntity.orderDetail = OrderDetailMapper.toPersistence(
        domainEntity.orderDetail,
      );
    } else if (domainEntity.orderDetail === null) {
      persistenceEntity.orderDetail = null;
    }

    persistenceEntity.quantity = domainEntity.quantity;
    persistenceEntity.unitPrice = domainEntity.unitPrice;
    persistenceEntity.unit = domainEntity.unit;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
