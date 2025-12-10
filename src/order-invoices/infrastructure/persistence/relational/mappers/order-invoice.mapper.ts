import { OrderPhaseMapper } from 'src/order-phases/infrastructure/persistence/relational/mappers/order-phase.mapper';
import { PaymentMapper } from '../../../../../payments/infrastructure/persistence/relational/mappers/payment.mapper';

import { OrderInvoiceResponse } from 'src/order-invoices/dto/order-invoice-response.dto';
import { OrderInvoice } from '../../../../domain/order-invoice';
import { OrderInvoiceEntity } from '../entities/order-invoice.entity';

export class OrderInvoiceMapper {
  static toDomain(raw: OrderInvoiceEntity): OrderInvoice {
    const domainEntity = new OrderInvoice();
    if (raw.payment) {
      domainEntity.payment = PaymentMapper.toDomain(raw.payment);
    } else if (raw.payment === null) {
      domainEntity.payment = null;
    }

    domainEntity.totalPayment = raw.totalPayment;
    domainEntity.totalAmount = raw.totalAmount;
    domainEntity.quantity = raw.quantity;
    domainEntity.unit = raw.unit;
    domainEntity.vatAmount = raw.vatAmount;
    domainEntity.taxRate = raw.taxRate;
    domainEntity.invoiceNumber = raw.invoiceNumber;
    domainEntity.invoiceUrl = raw.invoiceUrl;

    if (raw.orderPhase) {
      domainEntity.orderPhase = OrderPhaseMapper.toDomain(raw.orderPhase);
    } else if (raw.orderPhase === null) {
      domainEntity.orderPhase = null;
    }
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderInvoice): OrderInvoiceEntity {
    const persistenceEntity = new OrderInvoiceEntity();
    if (domainEntity.payment) {
      persistenceEntity.payment = PaymentMapper.toPersistence(
        domainEntity.payment,
      );
    } else if (domainEntity.payment === null) {
      persistenceEntity.payment = null;
    }

    persistenceEntity.totalPayment = domainEntity.totalPayment;
    persistenceEntity.totalAmount = domainEntity.totalAmount;
    persistenceEntity.quantity = domainEntity.quantity;
    persistenceEntity.unit = domainEntity.unit;
    persistenceEntity.vatAmount = domainEntity.vatAmount;
    persistenceEntity.taxRate = domainEntity.taxRate;
    persistenceEntity.invoiceNumber = domainEntity.invoiceNumber;
    persistenceEntity.invoiceUrl = domainEntity.invoiceUrl;

    if (domainEntity.orderPhase) {
      persistenceEntity.orderPhase = OrderPhaseMapper.toPersistence(
        domainEntity.orderPhase,
      );
    } else if (domainEntity.orderPhase === null) {
      persistenceEntity.orderPhase = null;
    }
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(raw: OrderInvoiceEntity): OrderInvoiceResponse {
    const domainEntity = new OrderInvoiceResponse();

    if (raw.payment) {
      domainEntity.payment = PaymentMapper.toDomain(raw.payment);
    } else if (raw.payment === null) {
      domainEntity.payment = null;
    }

    domainEntity.totalPayment = raw.totalPayment;
    domainEntity.totalAmount = raw.totalAmount;
    domainEntity.quantity = raw.quantity;
    domainEntity.unit = raw.unit;
    domainEntity.vatAmount = raw.vatAmount;
    domainEntity.taxRate = raw.taxRate;
    domainEntity.invoiceNumber = raw.invoiceNumber;
    domainEntity.invoiceUrl = raw.invoiceUrl;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }
}
