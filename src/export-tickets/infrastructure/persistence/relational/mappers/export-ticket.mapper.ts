import { ExportTicket } from '../../../../domain/export-ticket';

import { ExportTicketEntity } from '../entities/export-ticket.entity';

export class ExportTicketMapper {
  static toDomain(raw: ExportTicketEntity): ExportTicket {
    const domainEntity = new ExportTicket();
    domainEntity.unit = raw.unit;
    domainEntity.quantity = raw.quantity;

    domainEntity.exportDate = raw.exportDate;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ExportTicket): ExportTicketEntity {
    const persistenceEntity = new ExportTicketEntity();
    persistenceEntity.unit = domainEntity.unit;
    persistenceEntity.quantity = domainEntity.quantity;
    persistenceEntity.exportDate = domainEntity.exportDate;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
