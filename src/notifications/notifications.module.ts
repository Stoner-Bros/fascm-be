import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { RelationalNotificationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [
    UsersModule,

    // do not remove this comment
    RelationalNotificationPersistenceModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
  exports: [
    NotificationsService,
    RelationalNotificationPersistenceModule,
    NotificationsGateway,
  ],
})
export class NotificationsModule {}
