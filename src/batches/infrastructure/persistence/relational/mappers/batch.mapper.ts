import { Batch } from '../../../../domain/batch';

import { AreaMapper } from '../../../../../areas/infrastructure/persistence/relational/mappers/area.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { ImportTicketMapper } from '../../../../../import-tickets/infrastructure/persistence/relational/mappers/import-ticket.mapper';

import { BatchResponse } from 'src/batches/dto/batch-response.dto';
import { ExportTicketMapper } from 'src/export-tickets/infrastructure/persistence/relational/mappers/export-ticket.mapper';
import { BatchEntity } from '../entities/batch.entity';

export class BatchMapper {
  static toDomain(raw: BatchEntity): Batch {
    const domainEntity = new Batch();
    if (raw.exportTicket) {
      domainEntity.exportTicket = ExportTicketMapper.toDomain(raw.exportTicket);
    } else if (raw.exportTicket === null) {
      domainEntity.exportTicket = null;
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

  static toResponse(raw: BatchEntity): BatchResponse {
    const responseEntity = new BatchResponse();
    if (raw.exportTicket) {
      responseEntity.exportTicket = ExportTicketMapper.toDomain(
        raw.exportTicket,
      );
    } else if (raw.exportTicket === null) {
      responseEntity.exportTicket = null;
    }

    responseEntity.volume = raw.volume;

    responseEntity.quantity = raw.quantity;

    responseEntity.unit = raw.unit;

    responseEntity.batchCode = raw.batchCode;

    if (raw.area) {
      responseEntity.area = AreaMapper.toDomain(raw.area);
    } else if (raw.area === null) {
      responseEntity.area = null;
    }

    if (raw.product) {
      responseEntity.product = ProductMapper.toResponse(raw.product);
    } else if (raw.product === null) {
      responseEntity.product = null;
    }

    if (raw.importTicket) {
      responseEntity.importTicket = ImportTicketMapper.toDomain(
        raw.importTicket,
      );
    } else if (raw.importTicket === null) {
      responseEntity.importTicket = null;
    }

    responseEntity.id = raw.id;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;

    return responseEntity;
  }

  static toPersistence(domainEntity: Batch): BatchEntity {
    const persistenceEntity = new BatchEntity();
    if (domainEntity.exportTicket) {
      persistenceEntity.exportTicket = ExportTicketMapper.toPersistence(
        domainEntity.exportTicket,
      );
    } else if (domainEntity.exportTicket === null) {
      persistenceEntity.exportTicket = null;
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
