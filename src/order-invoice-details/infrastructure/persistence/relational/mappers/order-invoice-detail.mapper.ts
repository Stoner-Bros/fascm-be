import { ExportTicketMapper } from '../../../../../export-tickets/infrastructure/persistence/relational/mappers/export-ticket.mapper';
import { OrderInvoiceDetail } from '../../../../domain/order-invoice-detail';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { OrderInvoiceMapper } from '../../../../../order-invoices/infrastructure/persistence/relational/mappers/order-invoice.mapper';

import { OrderDetailSelectionMapper } from '../../../../../order-detail-selections/infrastructure/persistence/relational/mappers/order-detail-selection.mapper';
import { OrderDetailSelectionEntity } from '../../../../../order-detail-selections/infrastructure/persistence/relational/entities/order-detail-selection.entity';
import { OrderInvoiceDetailResponse } from 'src/order-invoice-details/dto/order-invoice-detail-response';
import { OrderInvoiceDetailEntity } from '../entities/order-invoice-detail.entity';

export class OrderInvoiceDetailMapper {
  static toDomain(raw: OrderInvoiceDetailEntity): OrderInvoiceDetail {
    const domainEntity = new OrderInvoiceDetail();
    if (raw.exportTicket) {
      domainEntity.exportTicket = ExportTicketMapper.toDomain(raw.exportTicket);
    } else if (raw.exportTicket === null) {
      domainEntity.exportTicket = null;
    }

    domainEntity.amount = raw.amount;

    domainEntity.taxRate = raw.taxRate;

    domainEntity.quantity = raw.quantity;

    domainEntity.unit = raw.unit;

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    if (raw.orderInvoice) {
      domainEntity.orderInvoice = OrderInvoiceMapper.toDomain(raw.orderInvoice);
    } else if (raw.orderInvoice === null) {
      domainEntity.orderInvoice = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: OrderInvoiceDetail,
  ): OrderInvoiceDetailEntity {
    const persistenceEntity = new OrderInvoiceDetailEntity();
    if (domainEntity.exportTicket) {
      persistenceEntity.exportTicket = ExportTicketMapper.toPersistence(
        domainEntity.exportTicket,
      );
    } else if (domainEntity.exportTicket === null) {
      persistenceEntity.exportTicket = null;
    }

    persistenceEntity.amount = domainEntity.amount;

    persistenceEntity.taxRate = domainEntity.taxRate;

    persistenceEntity.quantity = domainEntity.quantity;

    persistenceEntity.unit = domainEntity.unit;

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    } else if (domainEntity.product === null) {
      persistenceEntity.product = null;
    }

    if (domainEntity.orderInvoice) {
      persistenceEntity.orderInvoice = OrderInvoiceMapper.toPersistence(
        domainEntity.orderInvoice,
      );
    } else if (domainEntity.orderInvoice === null) {
      persistenceEntity.orderInvoice = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(
    raw: OrderInvoiceDetailEntity,
    orderDetailSelections?: OrderDetailSelectionEntity[],
  ): OrderInvoiceDetailResponse {
    const responseEntity = new OrderInvoiceDetailResponse();

    responseEntity.amount = raw.amount;

    responseEntity.taxRate = raw.taxRate;
    responseEntity.quantity = raw.quantity;

    responseEntity.unit = raw.unit;

    if (raw.product) {
      responseEntity.product = ProductMapper.toResponse(raw.product);
    } else if (raw.product === null) {
      responseEntity.product = null;
    }

    // Map orderDetailSelections if provided
    if (orderDetailSelections && orderDetailSelections.length > 0) {
      responseEntity.orderDetailSelections = orderDetailSelections.map(
        (selection) => OrderDetailSelectionMapper.toResponse(selection),
      );
    } else {
      responseEntity.orderDetailSelections = [];
    }

    responseEntity.id = raw.id;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;
    return responseEntity;
  }
}
