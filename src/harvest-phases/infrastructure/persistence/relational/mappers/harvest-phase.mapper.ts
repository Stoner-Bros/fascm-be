import { HarvestPhase } from '../../../../domain/harvest-phase';

import { HarvestScheduleMapper } from '../../../../../harvest-schedules/infrastructure/persistence/relational/mappers/harvest-schedule.mapper';

import { HarvestPhaseEntity } from '../entities/harvest-phase.entity';

export class HarvestPhaseMapper {
  static toDomain(raw: HarvestPhaseEntity): HarvestPhase {
    const domainEntity = new HarvestPhase();
    domainEntity.description = raw.description;

    domainEntity.status = raw.status;

    domainEntity.phaseNumber = raw.phaseNumber;

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

  static toPersistence(domainEntity: HarvestPhase): HarvestPhaseEntity {
    const persistenceEntity = new HarvestPhaseEntity();
    persistenceEntity.description = domainEntity.description;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.phaseNumber = domainEntity.phaseNumber;

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
}
