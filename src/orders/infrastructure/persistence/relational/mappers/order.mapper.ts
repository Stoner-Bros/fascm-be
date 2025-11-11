import { Order } from '../../../../domain/order';

import { PaymentMapper } from '../../../../../payments/infrastructure/persistence/relational/mappers/payment.mapper';

import { OrderScheduleMapper } from '../../../../../order-schedules/infrastructure/persistence/relational/mappers/order-schedule.mapper';

import { OrderEntity } from '../entities/order.entity';

export class OrderMapper {
  static toDomain(raw: OrderEntity): Order {
    const domainEntity = new Order();
    domainEntity.totalVolume = raw.totalVolume;

    domainEntity.totalMass = raw.totalMass;

    domainEntity.totalPayment = raw.totalPayment;

    domainEntity.vatAmount = raw.vatAmount;

    domainEntity.totalAmount = raw.totalAmount;

    domainEntity.taxRate = raw.taxRate;

    domainEntity.orderDate = raw.orderDate;

    domainEntity.orderUrl = raw.orderUrl;

    if (raw.payment) {
      domainEntity.payment = PaymentMapper.toDomain(raw.payment);
    } else if (raw.payment === null) {
      domainEntity.payment = null;
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

  static toPersistence(domainEntity: Order): OrderEntity {
    const persistenceEntity = new OrderEntity();
    persistenceEntity.totalVolume = domainEntity.totalVolume;

    persistenceEntity.totalMass = domainEntity.totalMass;

    persistenceEntity.totalPayment = domainEntity.totalPayment;

    persistenceEntity.vatAmount = domainEntity.vatAmount;

    persistenceEntity.totalAmount = domainEntity.totalAmount;

    persistenceEntity.taxRate = domainEntity.taxRate;

    persistenceEntity.orderDate = domainEntity.orderDate;

    persistenceEntity.orderUrl = domainEntity.orderUrl;

    if (domainEntity.payment) {
      persistenceEntity.payment = PaymentMapper.toPersistence(
        domainEntity.payment,
      );
    } else if (domainEntity.payment === null) {
      persistenceEntity.payment = null;
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
}
