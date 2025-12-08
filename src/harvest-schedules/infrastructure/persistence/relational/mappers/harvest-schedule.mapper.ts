import { HarvestSchedule } from '../../../../domain/harvest-schedule';

import { SupplierMapper } from '../../../../../suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';
import { HarvestTicketMapper } from '../../../../../harvest-tickets/infrastructure/persistence/relational/mappers/harvest-ticket.mapper';

import { HarvestScheduleEntity } from '../entities/harvest-schedule.entity';
import { HarvestScheduleResponse } from 'src/harvest-schedules/dto/harvest-schedule-response';
import { ProductMapper } from 'src/products/infrastructure/persistence/relational/mappers/product.mapper';

export class HarvestScheduleMapper {
  static toDomain(raw: HarvestScheduleEntity): HarvestSchedule {
    const domainEntity = new HarvestSchedule();

    domainEntity.address = raw.address;

    domainEntity.description = raw.description;

    domainEntity.status = raw.status;

    domainEntity.harvestDate = raw.harvestDate;

    if (raw.supplier) {
      domainEntity.supplier = SupplierMapper.toDomain(raw.supplier);
    } else if (raw.supplier === null) {
      domainEntity.supplier = null;
    }

    domainEntity.id = raw.id;
    domainEntity.reason = raw.reason;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: HarvestSchedule): HarvestScheduleEntity {
    const persistenceEntity = new HarvestScheduleEntity();

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.harvestDate = domainEntity.harvestDate;

    if (domainEntity.supplier) {
      persistenceEntity.supplier = SupplierMapper.toPersistence(
        domainEntity.supplier,
      );
    } else if (domainEntity.supplier === null) {
      persistenceEntity.supplier = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.reason = domainEntity.reason;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(raw: HarvestScheduleEntity): HarvestScheduleResponse {
    const responseEntity = new HarvestScheduleResponse();

    responseEntity.address = raw.address;

    responseEntity.description = raw.description;
    responseEntity.status = raw.status;

    responseEntity.harvestDate = raw.harvestDate;
    responseEntity.reason = raw.reason;

    // remove warehouse prop of supplier mapping
    if (raw.supplier) {
      responseEntity.supplier = SupplierMapper.toDomain(raw.supplier);
    } else if (raw.supplier === null) {
      responseEntity.supplier = null;
    }

    if (raw.harvestTicket) {
      responseEntity.harvestTicket = HarvestTicketMapper.toResponse(
        raw.harvestTicket,
      );
      // Map harvest details if exists
      if (
        raw.harvestTicket.harvestDetails &&
        Array.isArray(raw.harvestTicket.harvestDetails)
      ) {
        responseEntity.harvestDetails = raw.harvestTicket.harvestDetails.map(
          (detail) => {
            const detailResponse: any = {
              id: detail.id,
              amount: detail.amount,
              unitPrice: detail.unitPrice,
              quantity: detail.quantity,
              unit: detail.unit,
              createdAt: detail.createdAt,
              updatedAt: detail.updatedAt,
            };
            if (detail.product) {
              detailResponse.product = ProductMapper.toResponse(detail.product);
            }
            return detailResponse;
          },
        );
      } else {
        responseEntity.harvestDetails = [];
      }
    }

    responseEntity.id = raw.id;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;

    return responseEntity;
  }
}
