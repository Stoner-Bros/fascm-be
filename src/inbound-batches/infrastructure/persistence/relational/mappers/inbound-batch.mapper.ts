import { InboundBatch } from '../../../../domain/inbound-batch';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { HarvestInvoiceDetailMapper } from 'src/harvest-invoice-details/infrastructure/persistence/relational/mappers/harvest-invoice-detail.mapper';
import { InboundBatchEntity } from '../entities/inbound-batch.entity';

export class InboundBatchMapper {
  static toDomain(raw: InboundBatchEntity): InboundBatch {
    const domainEntity = new InboundBatch();
    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    domainEntity.batchCode = raw.batchCode;

    if (raw.importTicket) {
      domainEntity.importTicket = ProductMapper.toDomain(raw.importTicket);
    } else if (raw.importTicket === null) {
      domainEntity.importTicket = null;
    }

    if (raw.harvestInvoiceDetail) {
      domainEntity.harvestInvoiceDetail = HarvestInvoiceDetailMapper.toDomain(
        raw.harvestInvoiceDetail,
      );
    } else if (raw.harvestInvoiceDetail === null) {
      domainEntity.harvestInvoiceDetail = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: InboundBatch): InboundBatchEntity {
    const persistenceEntity = new InboundBatchEntity();
    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.batchCode = domainEntity.batchCode;

    if (domainEntity.importTicket) {
      persistenceEntity.importTicket = ProductMapper.toPersistence(
        domainEntity.importTicket,
      );
    } else if (domainEntity.importTicket === null) {
      persistenceEntity.importTicket = null;
    }

    if (domainEntity.harvestInvoiceDetail) {
      persistenceEntity.harvestInvoiceDetail =
        HarvestInvoiceDetailMapper.toPersistence(
          domainEntity.harvestInvoiceDetail,
        );
    } else if (domainEntity.harvestInvoiceDetail === null) {
      persistenceEntity.harvestInvoiceDetail = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
