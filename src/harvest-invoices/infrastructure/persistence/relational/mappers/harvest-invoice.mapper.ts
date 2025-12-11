import { HarvestInvoice } from '../../../../domain/harvest-invoice';

import { HarvestPhaseMapper } from '../../../../../harvest-phases/infrastructure/persistence/relational/mappers/harvest-phase.mapper';

import { HarvestInvoiceEntity } from '../entities/harvest-invoice.entity';
import { HarvestInvoiceResponse } from 'src/harvest-invoices/dto/harvest-invoice-response.dto';

export class HarvestInvoiceMapper {
  static toDomain(raw: HarvestInvoiceEntity): HarvestInvoice {
    const domainEntity = new HarvestInvoice();
    domainEntity.totalPayment = raw.totalPayment;

    domainEntity.totalAmount = raw.totalAmount;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    domainEntity.vatAmount = raw.vatAmount;

    domainEntity.taxRate = raw.taxRate;

    domainEntity.accountNumber = raw.accountNumber;

    domainEntity.paymentStatus = raw.paymentStatus;

    domainEntity.paymentMethod = raw.paymentMethod;

    domainEntity.invoiceNumber = raw.invoiceNumber;

    domainEntity.invoiceUrl = raw.invoiceUrl;

    if (raw.harvestPhase) {
      domainEntity.harvestPhase = HarvestPhaseMapper.toDomain(raw.harvestPhase);
    } else if (raw.harvestPhase === null) {
      domainEntity.harvestPhase = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: HarvestInvoice): HarvestInvoiceEntity {
    const persistenceEntity = new HarvestInvoiceEntity();
    persistenceEntity.totalPayment = domainEntity.totalPayment;

    persistenceEntity.totalAmount = domainEntity.totalAmount;

    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.vatAmount = domainEntity.vatAmount;

    persistenceEntity.taxRate = domainEntity.taxRate;

    persistenceEntity.accountNumber = domainEntity.accountNumber;

    persistenceEntity.paymentStatus = domainEntity.paymentStatus;

    persistenceEntity.paymentMethod = domainEntity.paymentMethod;

    persistenceEntity.invoiceNumber = domainEntity.invoiceNumber;

    persistenceEntity.invoiceUrl = domainEntity.invoiceUrl;

    if (domainEntity.harvestPhase) {
      persistenceEntity.harvestPhase = HarvestPhaseMapper.toPersistence(
        domainEntity.harvestPhase,
      );
    } else if (domainEntity.harvestPhase === null) {
      persistenceEntity.harvestPhase = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(raw: HarvestInvoiceEntity): HarvestInvoiceResponse {
    const responseEntity = new HarvestInvoiceResponse();
    responseEntity.totalPayment = raw.totalPayment;
    responseEntity.totalAmount = raw.totalAmount;
    responseEntity.quantity = raw.quantity;
    responseEntity.unit = raw.unit;
    responseEntity.vatAmount = raw.vatAmount;
    responseEntity.taxRate = raw.taxRate;
    responseEntity.accountNumber = raw.accountNumber;
    responseEntity.paymentStatus = raw.paymentStatus;
    responseEntity.paymentMethod = raw.paymentMethod;
    responseEntity.invoiceNumber = raw.invoiceNumber;
    responseEntity.invoiceUrl = raw.invoiceUrl;
    responseEntity.id = raw.id;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;

    return responseEntity;
  }
}
