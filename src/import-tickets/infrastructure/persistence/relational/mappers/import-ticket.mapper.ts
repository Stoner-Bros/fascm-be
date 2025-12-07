import { ImportTicket } from '../../../../domain/import-ticket';

import { ImportTicketEntity } from '../entities/import-ticket.entity';

export class ImportTicketMapper {
  static toDomain(raw: ImportTicketEntity): ImportTicket {
    const domainEntity = new ImportTicket();
    domainEntity.unit = raw.unit;
    domainEntity.quantity = raw.quantity;

    domainEntity.percent = raw.percent;

    domainEntity.importDate = raw.importDate;
    domainEntity.expiredAt = raw.expiredAt;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ImportTicket): ImportTicketEntity {
    const persistenceEntity = new ImportTicketEntity();
    persistenceEntity.unit = domainEntity.unit;
    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.percent = domainEntity.percent;

    persistenceEntity.importDate = domainEntity.importDate;
    persistenceEntity.expiredAt = domainEntity.expiredAt;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
