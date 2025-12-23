import { OrderPhase } from '../../../../domain/order-phase';

import { OrderScheduleMapper } from '../../../../../order-schedules/infrastructure/persistence/relational/mappers/order-schedule.mapper';

import { ImageProofMapper } from 'src/image-proofs/infrastructure/persistence/relational/mappers/image-proof.mapper';
import { OrderInvoiceDetailMapper } from 'src/order-invoice-details/infrastructure/persistence/relational/mappers/order-invoice-detail.mapper';
import { OrderInvoiceMapper } from 'src/order-invoices/infrastructure/persistence/relational/mappers/order-invoice.mapper';
import { OrderPhaseResponse } from 'src/order-phases/dto/order-phase-response.dto';
import { OrderPhaseEntity } from '../entities/order-phase.entity';

export class OrderPhaseMapper {
  static toDomain(raw: OrderPhaseEntity): OrderPhase {
    const domainEntity = new OrderPhase();
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

    if (raw.orderSchedule) {
      domainEntity.orderSchedule = OrderScheduleMapper.toDomain(
        raw.orderSchedule,
      );
    } else if (raw.orderSchedule === null) {
      domainEntity.orderSchedule = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderPhase): OrderPhaseEntity {
    const persistenceEntity = new OrderPhaseEntity();
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

    if (domainEntity.orderSchedule) {
      persistenceEntity.orderSchedule = OrderScheduleMapper.toPersistence(
        domainEntity.orderSchedule,
      );
    } else if (domainEntity.orderSchedule === null) {
      persistenceEntity.orderSchedule = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(raw: OrderPhaseEntity): OrderPhaseResponse {
    const responseEntity = new OrderPhaseResponse();
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

    if (raw.orderInvoice) {
      responseEntity.orderInvoice = OrderInvoiceMapper.toResponse(
        raw.orderInvoice,
      );
      // Map invoice details if exists
      if (
        raw.orderInvoice.orderInvoiceDetails &&
        Array.isArray(raw.orderInvoice.orderInvoiceDetails)
      ) {
        responseEntity.orderInvoiceDetails =
          raw.orderInvoice.orderInvoiceDetails.map((detail) =>
            OrderInvoiceDetailMapper.toResponse(
              detail,
              detail.exportTicket?.orderDetailSelections,
            ),
          );
      } else {
        responseEntity.orderInvoiceDetails = [];
      }
    }

    responseEntity.id = raw.id;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;

    return responseEntity;
  }
}
