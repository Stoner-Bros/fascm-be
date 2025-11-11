import { ExportTicket } from '../../../../domain/export-ticket';

import { OrderDetailMapper } from '../../../../../order-details/infrastructure/persistence/relational/mappers/order-detail.mapper';

import { ExportTicketEntity } from '../entities/export-ticket.entity';

export class ExportTicketMapper {
  static toDomain(raw: ExportTicketEntity): ExportTicket {
    const domainEntity = new ExportTicket();
    domainEntity.numberOfBatch = raw.numberOfBatch;

    domainEntity.ExportDate = raw.ExportDate;

    if (raw.orderDetail) {
      domainEntity.orderDetail = OrderDetailMapper.toDomain(raw.orderDetail);
    } else if (raw.orderDetail === null) {
      domainEntity.orderDetail = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ExportTicket): ExportTicketEntity {
    const persistenceEntity = new ExportTicketEntity();
    persistenceEntity.numberOfBatch = domainEntity.numberOfBatch;

    persistenceEntity.ExportDate = domainEntity.ExportDate;

    if (domainEntity.orderDetail) {
      persistenceEntity.orderDetail = OrderDetailMapper.toPersistence(
        domainEntity.orderDetail,
      );
    } else if (domainEntity.orderDetail === null) {
      persistenceEntity.orderDetail = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
