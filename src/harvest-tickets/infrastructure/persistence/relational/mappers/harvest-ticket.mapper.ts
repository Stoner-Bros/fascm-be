import { HarvestTicket } from '../../../../domain/harvest-ticket';

import { HarvestScheduleMapper } from '../../../../../harvest-schedules/infrastructure/persistence/relational/mappers/harvest-schedule.mapper';

import { HarvestTicketEntity } from '../entities/harvest-ticket.entity';

import { HarvestTicketResponse } from '../../../../dto/harvest-ticket-response.dto';

export class HarvestTicketMapper {
  static toDomain(raw: HarvestTicketEntity): HarvestTicket {
    const domainEntity = new HarvestTicket();
    domainEntity.date = raw.date;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    domainEntity.totalPayment = raw.totalPayment;

    domainEntity.vatAmount = raw.vatAmount;

    domainEntity.totalAmount = raw.totalAmount;

    domainEntity.taxRate = raw.taxRate;

    domainEntity.accountNumber = raw.accountNumber;

    domainEntity.paymentMethod = raw.paymentMethod;

    domainEntity.ticketNumber = raw.ticketNumber;

    domainEntity.ticketUrl = raw.ticketUrl;

    if (raw.harvestScheduleId) {
      domainEntity.harvestScheduleId = HarvestScheduleMapper.toDomain(
        raw.harvestScheduleId,
      );
    } else if (raw.harvestScheduleId === null) {
      domainEntity.harvestScheduleId = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: HarvestTicket): HarvestTicketEntity {
    const persistenceEntity = new HarvestTicketEntity();
    persistenceEntity.date = domainEntity.date;

    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.totalPayment = domainEntity.totalPayment;

    persistenceEntity.vatAmount = domainEntity.vatAmount;

    persistenceEntity.totalAmount = domainEntity.totalAmount;

    persistenceEntity.taxRate = domainEntity.taxRate;

    persistenceEntity.accountNumber = domainEntity.accountNumber;

    persistenceEntity.paymentMethod = domainEntity.paymentMethod;

    persistenceEntity.ticketNumber = domainEntity.ticketNumber;

    persistenceEntity.ticketUrl = domainEntity.ticketUrl;

    if (domainEntity.harvestScheduleId) {
      persistenceEntity.harvestScheduleId = HarvestScheduleMapper.toPersistence(
        domainEntity.harvestScheduleId,
      );
    } else if (domainEntity.harvestScheduleId === null) {
      persistenceEntity.harvestScheduleId = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(entity: HarvestTicketEntity): HarvestTicketResponse {
    const responseEntity = new HarvestTicketResponse();
    responseEntity.date = entity.date;

    responseEntity.quantity = entity.quantity;

    responseEntity.unit = entity.unit;

    responseEntity.totalPayment = entity.totalPayment;

    responseEntity.vatAmount = entity.vatAmount;

    responseEntity.totalAmount = entity.totalAmount;

    responseEntity.taxRate = entity.taxRate;

    responseEntity.accountNumber = entity.accountNumber;

    responseEntity.paymentMethod = entity.paymentMethod;

    responseEntity.ticketNumber = entity.ticketNumber;

    responseEntity.ticketUrl = entity.ticketUrl;

    responseEntity.harvestScheduleId = entity.harvestScheduleId?.id || null;

    responseEntity.id = entity.id;

    responseEntity.createdAt = entity.createdAt;

    responseEntity.updatedAt = entity.updatedAt;

    return responseEntity;
  }
}
