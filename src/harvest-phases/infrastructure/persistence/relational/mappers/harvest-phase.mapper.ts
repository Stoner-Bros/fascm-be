import { HarvestPhase } from '../../../../domain/harvest-phase';

import { HarvestScheduleMapper } from '../../../../../harvest-schedules/infrastructure/persistence/relational/mappers/harvest-schedule.mapper';

import { HarvestInvoiceDetailMapper } from 'src/harvest-invoice-details/infrastructure/persistence/relational/mappers/harvest-invoice-detail.mapper';
import { HarvestInvoiceMapper } from 'src/harvest-invoices/infrastructure/persistence/relational/mappers/harvest-invoice.mapper';
import { HarvestPhaseResponse } from 'src/harvest-phases/dto/harvest-phase-response.dto';
import { ImageProofMapper } from 'src/image-proofs/infrastructure/persistence/relational/mappers/image-proof.mapper';
import { HarvestPhaseEntity } from '../entities/harvest-phase.entity';

export class HarvestPhaseMapper {
  static toDomain(raw: HarvestPhaseEntity): HarvestPhase {
    const domainEntity = new HarvestPhase();
    domainEntity.description = raw.description;

    domainEntity.status = raw.status;

    domainEntity.phaseNumber = raw.phaseNumber;

    if (raw.imageProof) {
      domainEntity.imageProof = raw.imageProof.map((item) =>
        ImageProofMapper.toDomain(item),
      );
    } else if (raw.imageProof === null) {
      domainEntity.imageProof = null;
    }

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

    if (domainEntity.imageProof) {
      persistenceEntity.imageProof = domainEntity.imageProof.map((item) =>
        ImageProofMapper.toPersistence(item),
      );
    } else if (domainEntity.imageProof === null) {
      persistenceEntity.imageProof = null;
    }

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

  static toResponse(raw: HarvestPhaseEntity): HarvestPhaseResponse {
    const responseEntity = new HarvestPhaseResponse();
    responseEntity.description = raw.description;

    responseEntity.status = raw.status;

    responseEntity.phaseNumber = raw.phaseNumber;

    if (raw.imageProof) {
      responseEntity.imageProof = raw.imageProof.map((item) =>
        ImageProofMapper.toResponse(item),
      );
    } else if (raw.imageProof === null) {
      responseEntity.imageProof = null;
    }

    if (raw.harvestInvoice) {
      responseEntity.harvestInvoice = HarvestInvoiceMapper.toResponse(
        raw.harvestInvoice,
      );
      // Map harvest details if exists
      if (
        raw.harvestInvoice.harvestInvoiceDetails &&
        Array.isArray(raw.harvestInvoice.harvestInvoiceDetails)
      ) {
        responseEntity.harvestInvoiceDetails =
          raw.harvestInvoice.harvestInvoiceDetails.map((detail) =>
            HarvestInvoiceDetailMapper.toResponse(detail),
          );
      } else {
        responseEntity.harvestInvoiceDetails = [];
      }
    }

    responseEntity.id = raw.id;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;

    return responseEntity;
  }
}
