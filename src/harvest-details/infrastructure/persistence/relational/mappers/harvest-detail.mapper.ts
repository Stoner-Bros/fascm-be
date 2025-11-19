import { HarvestDetail } from '../../../../domain/harvest-detail';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { HarvestTicketMapper } from '../../../../../harvest-tickets/infrastructure/persistence/relational/mappers/harvest-ticket.mapper';

import { HarvestDetailEntity } from '../entities/harvest-detail.entity';

import { HarvestDetailResponse } from '../../../../dto/harvest-detail-response.dto';

export class HarvestDetailMapper {
  static toDomain(raw: HarvestDetailEntity): HarvestDetail {
    const domainEntity = new HarvestDetail();
    domainEntity.taxRate = raw.taxRate;

    domainEntity.amount = raw.amount;

    domainEntity.unitPrice = raw.unitPrice;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    if (raw.harvestTicket) {
      domainEntity.harvestTicket = HarvestTicketMapper.toDomain(
        raw.harvestTicket,
      );
    } else if (raw.harvestTicket === null) {
      domainEntity.harvestTicket = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: HarvestDetail): HarvestDetailEntity {
    const persistenceEntity = new HarvestDetailEntity();
    persistenceEntity.taxRate = domainEntity.taxRate;

    persistenceEntity.amount = domainEntity.amount;

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

    if (domainEntity.harvestTicket) {
      persistenceEntity.harvestTicket = HarvestTicketMapper.toPersistence(
        domainEntity.harvestTicket,
      );
    } else if (domainEntity.harvestTicket === null) {
      persistenceEntity.harvestTicket = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(entity: HarvestDetailEntity): HarvestDetailResponse {
    const responseEntity = new HarvestDetailResponse();
    responseEntity.taxRate = entity.taxRate;

    responseEntity.amount = entity.amount;

    responseEntity.unitPrice = entity.unitPrice;

    responseEntity.quantity = entity.quantity;

    responseEntity.unit = entity.unit;

    if (entity.product) {
      responseEntity.product = ProductMapper.toDomain(entity.product);
    } else if (entity.product === null) {
      responseEntity.product = null;
    }

    if (entity.harvestTicket) {
      responseEntity.harvestTicketId = entity.harvestTicket.id;
    } else if (entity.harvestTicket === null) {
      responseEntity.harvestTicketId = null;
    }

    responseEntity.id = entity.id;
    responseEntity.createdAt = entity.createdAt;
    responseEntity.updatedAt = entity.updatedAt;

    return responseEntity;
  }
}
