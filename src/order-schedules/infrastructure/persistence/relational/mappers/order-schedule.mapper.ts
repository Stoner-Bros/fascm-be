import { OrderSchedule } from '../../../../domain/order-schedule';

import { ConsigneeMapper } from '../../../../../consignees/infrastructure/persistence/relational/mappers/consignee.mapper';

import { OrderDetailMapper } from 'src/order-details/infrastructure/persistence/relational/mappers/order-detail.mapper';
import { OrderScheduleResponse } from 'src/order-schedules/dto/order-schedule-response.dto';
import { OrderMapper } from 'src/orders/infrastructure/persistence/relational/mappers/order.mapper';
import { OrderScheduleEntity } from '../entities/order-schedule.entity';

export class OrderScheduleMapper {
  static toDomain(raw: OrderScheduleEntity): OrderSchedule {
    const domainEntity = new OrderSchedule();
    domainEntity.address = raw.address;

    domainEntity.description = raw.description;

    domainEntity.status = raw.status;

    domainEntity.deliveryDate = raw.deliveryDate;

    if (raw.consignee) {
      domainEntity.consignee = ConsigneeMapper.toDomain(raw.consignee);
    } else if (raw.consignee === null) {
      domainEntity.consignee = null;
    }

    domainEntity.id = raw.id;
    domainEntity.reason = raw.reason;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderSchedule): OrderScheduleEntity {
    const persistenceEntity = new OrderScheduleEntity();

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.deliveryDate = domainEntity.deliveryDate;

    if (domainEntity.consignee) {
      persistenceEntity.consignee = ConsigneeMapper.toPersistence(
        domainEntity.consignee,
      );
    } else if (domainEntity.consignee === null) {
      persistenceEntity.consignee = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.reason = domainEntity.reason;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }

  static toResponse(raw: OrderScheduleEntity): OrderScheduleResponse {
    const responseEntity = new OrderScheduleResponse();
    responseEntity.address = raw.address;

    responseEntity.description = raw.description;

    responseEntity.status = raw.status;

    responseEntity.deliveryDate = raw.deliveryDate;

    if (raw.consignee) {
      responseEntity.consignee = ConsigneeMapper.toDomain(raw.consignee);
    } else if (raw.consignee === null) {
      responseEntity.consignee = null;
    }

    if (raw.order) {
      responseEntity.order = OrderMapper.toResponse(raw.order);
      // Map harvest details if exists
      if (raw.order.orderDetails && Array.isArray(raw.order.orderDetails)) {
        responseEntity.orderDetails = raw.order.orderDetails.map((detail) =>
          OrderDetailMapper.toResponseDto(detail),
        );
      } else {
        responseEntity.orderDetails = [];
      }
    }

    responseEntity.id = raw.id;
    responseEntity.reason = raw.reason;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;

    return responseEntity;
  }
}
