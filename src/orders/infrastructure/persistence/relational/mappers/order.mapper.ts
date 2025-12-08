import { Order } from '../../../../domain/order';

import { OrderScheduleMapper } from '../../../../../order-schedules/infrastructure/persistence/relational/mappers/order-schedule.mapper';

import { OrderResponseDto } from 'src/orders/dto/order-response.dto';
import { OrderEntity } from '../entities/order.entity';

export class OrderMapper {
  static toDomain(raw: OrderEntity): Order {
    const domainEntity = new Order();
    domainEntity.unit = raw.unit;

    domainEntity.quantity = raw.quantity;
    domainEntity.orderNumber = raw.orderNumber;

    domainEntity.orderUrl = raw.orderUrl;

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

  static toPersistence(domainEntity: Order): OrderEntity {
    const persistenceEntity = new OrderEntity();
    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.quantity = domainEntity.quantity;
    persistenceEntity.orderNumber = domainEntity.orderNumber;

    persistenceEntity.orderUrl = domainEntity.orderUrl;

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

  static toResponse(raw: OrderEntity): OrderResponseDto {
    const responseEntity = new OrderResponseDto();
    responseEntity.unit = raw.unit;

    responseEntity.quantity = raw.quantity;
    responseEntity.orderNumber = raw.orderNumber;
    responseEntity.orderUrl = raw.orderUrl;

    responseEntity.id = raw.id;
    responseEntity.createdAt = raw.createdAt;
    responseEntity.updatedAt = raw.updatedAt;

    return responseEntity;
  }
}
