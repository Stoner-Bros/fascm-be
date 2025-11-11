import { Payment } from '../../../../domain/payment';

import { PaymentEntity } from '../entities/payment.entity';

export class PaymentMapper {
  static toDomain(raw: PaymentEntity): Payment {
    const domainEntity = new Payment();
    domainEntity.paymentCode = raw.paymentCode;

    domainEntity.status = raw.status;

    domainEntity.amount = raw.amount;

    domainEntity.paymentMethod = raw.paymentMethod;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Payment): PaymentEntity {
    const persistenceEntity = new PaymentEntity();
    persistenceEntity.paymentCode = domainEntity.paymentCode;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.amount = domainEntity.amount;

    persistenceEntity.paymentMethod = domainEntity.paymentMethod;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
