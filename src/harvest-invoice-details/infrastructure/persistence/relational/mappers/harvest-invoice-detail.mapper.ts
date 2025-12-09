import { HarvestInvoiceDetail } from '../../../../domain/harvest-invoice-detail';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { HarvestInvoiceMapper } from '../../../../../harvest-invoices/infrastructure/persistence/relational/mappers/harvest-invoice.mapper';

import { HarvestInvoiceDetailEntity } from '../entities/harvest-invoice-detail.entity';
import { HarvestInvoiceDetailResponse } from 'src/harvest-invoice-details/dto/harvest-invoice-detail-response';

export class HarvestInvoiceDetailMapper {
  static toDomain(raw: HarvestInvoiceDetailEntity): HarvestInvoiceDetail {
    const domainEntity = new HarvestInvoiceDetail();
    domainEntity.amount = raw.amount;

    domainEntity.taxRate = raw.taxRate;

    domainEntity.unitPrice = raw.unitPrice;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    if (raw.harvestInvoice) {
      domainEntity.harvestInvoice = HarvestInvoiceMapper.toDomain(
        raw.harvestInvoice,
      );
    } else if (raw.harvestInvoice === null) {
      domainEntity.harvestInvoice = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: HarvestInvoiceDetail,
  ): HarvestInvoiceDetailEntity {
    const persistenceEntity = new HarvestInvoiceDetailEntity();
    persistenceEntity.amount = domainEntity.amount;

    persistenceEntity.taxRate = domainEntity.taxRate;

    persistenceEntity.unitPrice = domainEntity.unitPrice;

    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    } else if (domainEntity.product === null) {
      persistenceEntity.product = null;
    }

    if (domainEntity.harvestInvoice) {
      persistenceEntity.harvestInvoice = HarvestInvoiceMapper.toPersistence(
        domainEntity.harvestInvoice,
      );
    } else if (domainEntity.harvestInvoice === null) {
      persistenceEntity.harvestInvoice = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(
    raw: HarvestInvoiceDetailEntity,
  ): HarvestInvoiceDetailResponse {
    const responseEntity = new HarvestInvoiceDetailResponse();
    responseEntity.amount = raw.amount;
    responseEntity.taxRate = raw.taxRate;
    responseEntity.unitPrice = raw.unitPrice;
    responseEntity.quantity = raw.quantity;
    responseEntity.unit = raw.unit;

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
}
