import { ImportTicket } from '../../../../domain/import-ticket';

import { InboundBatchMapper } from '../../../../../inbound-batches/infrastructure/persistence/relational/mappers/inbound-batch.mapper';

import { ImportTicketEntity } from '../entities/import-ticket.entity';

export class ImportTicketMapper {
  static toDomain(raw: ImportTicketEntity): ImportTicket {
    const domainEntity = new ImportTicket();
    domainEntity.numberOfBatch = raw.numberOfBatch;

    domainEntity.percent = raw.percent;

    domainEntity.importDate = raw.importDate;

    if (raw.inboundBatch) {
      domainEntity.inboundBatch = InboundBatchMapper.toDomain(raw.inboundBatch);
    } else if (raw.inboundBatch === null) {
      domainEntity.inboundBatch = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ImportTicket): ImportTicketEntity {
    const persistenceEntity = new ImportTicketEntity();
    persistenceEntity.numberOfBatch = domainEntity.numberOfBatch;

    persistenceEntity.percent = domainEntity.percent;

    persistenceEntity.importDate = domainEntity.importDate;

    if (domainEntity.inboundBatch) {
      persistenceEntity.inboundBatch = InboundBatchMapper.toPersistence(
        domainEntity.inboundBatch,
      );
    } else if (domainEntity.inboundBatch === null) {
      persistenceEntity.inboundBatch = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
