import { Batch } from '../../../../domain/batch';

import { AreaMapper } from '../../../../../areas/infrastructure/persistence/relational/mappers/area.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { ImportTicketMapper } from '../../../../../import-tickets/infrastructure/persistence/relational/mappers/import-ticket.mapper';

import { BatchResponse } from 'src/batches/dto/batch-response.dto';
import { PriceMapper } from 'src/prices/infrastructure/persistence/relational/mappers/price.mapper';
import { BatchEntity } from '../entities/batch.entity';

export class BatchMapper {
  static toDomain(raw: BatchEntity): Batch {
    const domainEntity = new Batch();
    domainEntity.costPrice = raw.costPrice;

    domainEntity.quantity = raw.quantity;
    domainEntity.currentQuantity = raw.currentQuantity;

    domainEntity.unit = raw.unit;

    domainEntity.batchCode = raw.batchCode;

    domainEntity.expiredAt = raw.expiredAt;

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
    responseEntity.costPrice = raw.costPrice;

    responseEntity.quantity = raw.quantity;
    responseEntity.currentQuantity = raw.currentQuantity;

    responseEntity.unit = raw.unit;

    responseEntity.batchCode = raw.batchCode;
    responseEntity.expiredAt = raw.expiredAt;

    // map for price array
    if (raw.price) {
      responseEntity.price = raw.price.map((price) =>
        PriceMapper.toResponse(price),
      );
    } else if (raw.price === null) {
      responseEntity.price = [];
    }

    if (raw.product) {
      responseEntity.product = ProductMapper.toResponse(raw.product);
    } else if (raw.product === null) {
      responseEntity.product = null;
    }

    responseEntity.id = raw.id;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;

    return responseEntity;
  }

  static toPersistence(domainEntity: Batch): BatchEntity {
    const persistenceEntity = new BatchEntity();
    persistenceEntity.costPrice = domainEntity.costPrice;

    persistenceEntity.quantity = domainEntity.quantity;
    persistenceEntity.currentQuantity = domainEntity.currentQuantity;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.batchCode = domainEntity.batchCode;
    persistenceEntity.expiredAt = domainEntity.expiredAt;

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
