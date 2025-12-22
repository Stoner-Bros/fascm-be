import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { RelationalNotificationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { NotificationsGateway } from './notifications.gateway';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { ConsigneesModule } from '../consignees/consignees.module';
import { ManagersModule } from '../managers/managers.module';
import { StaffsModule } from '../staffs/staffs.module';
import { DeliveryStaffsModule } from '../delivery-staffs/delivery-staffs.module';

@Module({
  imports: [
    UsersModule,

    // do not remove this comment
    RelationalNotificationPersistenceModule,
    forwardRef(() => SuppliersModule),
    forwardRef(() => ConsigneesModule),
    forwardRef(() => ManagersModule),
    forwardRef(() => StaffsModule),
    forwardRef(() => DeliveryStaffsModule),
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
