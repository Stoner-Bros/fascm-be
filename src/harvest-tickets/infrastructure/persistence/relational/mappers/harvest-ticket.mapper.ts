import { HarvestTicket } from '../../../../domain/harvest-ticket';

import { HarvestScheduleMapper } from '../../../../../harvest-schedules/infrastructure/persistence/relational/mappers/harvest-schedule.mapper';

import { HarvestTicketEntity } from '../entities/harvest-ticket.entity';

import { HarvestTicketResponse } from '../../../../dto/harvest-ticket-response.dto';

export class HarvestTicketMapper {
  static toDomain(raw: HarvestTicketEntity): HarvestTicket {
    const domainEntity = new HarvestTicket();
    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    domainEntity.ticketNumber = raw.ticketNumber;

    domainEntity.ticketUrl = raw.ticketUrl;

    if (raw.harvestSchedule) {
      domainEntity.harvestSchedule = HarvestScheduleMapper.toDomain(
        raw.harvestSchedule,
      );
    } else if (raw.harvestSchedule === null) {
      domainEntity.harvestSchedule = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: HarvestTicket): HarvestTicketEntity {
    const persistenceEntity = new HarvestTicketEntity();
    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.ticketNumber = domainEntity.ticketNumber;

    persistenceEntity.ticketUrl = domainEntity.ticketUrl;

    if (domainEntity.harvestSchedule) {
      persistenceEntity.harvestSchedule = HarvestScheduleMapper.toPersistence(
        domainEntity.harvestSchedule,
      );
    } else if (domainEntity.harvestSchedule === null) {
      persistenceEntity.harvestSchedule = null;
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
    responseEntity.quantity = entity.quantity;

    responseEntity.unit = entity.unit;

    responseEntity.ticketNumber = entity.ticketNumber;

    responseEntity.ticketUrl = entity.ticketUrl;

    responseEntity.harvestScheduleId = entity.harvestSchedule?.id || null;

    responseEntity.id = entity.id;

    responseEntity.createdAt = entity.createdAt;

    responseEntity.updatedAt = entity.updatedAt;

    return responseEntity;
  }
}
