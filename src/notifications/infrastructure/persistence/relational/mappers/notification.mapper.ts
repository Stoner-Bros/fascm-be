import { Notification } from '../../../../domain/notification';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { NotificationEntity } from '../entities/notification.entity';

export class NotificationMapper {
  static toDomain(raw: NotificationEntity): Notification {
    const domainEntity = new Notification();
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    } else if (raw.user === null) {
      domainEntity.user = null;
    }

    domainEntity.deletedAt = raw.deletedAt;

    domainEntity.isRead = raw.isRead;

    domainEntity.type = raw.type;

    domainEntity.message = raw.message;

    domainEntity.title = raw.title;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Notification): NotificationEntity {
    const persistenceEntity = new NotificationEntity();
    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    } else if (domainEntity.user === null) {
      persistenceEntity.user = null;
    }

    persistenceEntity.deletedAt = domainEntity.deletedAt;

    persistenceEntity.isRead = domainEntity.isRead;

    persistenceEntity.type = domainEntity.type;

    persistenceEntity.message = domainEntity.message;

    persistenceEntity.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
