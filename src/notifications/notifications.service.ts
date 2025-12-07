import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Notification } from './domain/notification';
import { NotificationsGateway } from './notifications.gateway';
import { SuppliersService } from '../suppliers/suppliers.service';
import { ConsigneesService } from '../consignees/consignees.service';
import { RoleEnum } from 'src/roles/roles.enum';
import { ManagersService } from '../managers/managers.service';
import { StaffsService } from '../staffs/staffs.service';
import { DeliveryStaffsService } from '../delivery-staffs/delivery-staffs.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly suppliersService: SuppliersService,
    private readonly consigneesService: ConsigneesService,
    private readonly managersService: ManagersService,
    private readonly staffsService: StaffsService,
    private readonly deliveryStaffsService: DeliveryStaffsService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    // Do not remove comment below.
    // <creating-property />
    let user: User | null | undefined = undefined;

    if (createNotificationDto.user) {
      const userObject = await this.userService.findById(
        createNotificationDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (createNotificationDto.user === null) {
      user = null;
    }

    const created = await this.notificationRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      user,

      deletedAt: createNotificationDto.deletedAt,

      isRead: createNotificationDto.isRead,

      type: createNotificationDto.type,

      message: createNotificationDto.message,

      title: createNotificationDto.title,
    });

    try {
      const payload = {
        id: created.id,
        type: created.type ?? 'info',
        title: created.title ?? undefined,
        message: created.message ?? undefined,
        timestamp:
          created.createdAt?.toISOString?.() ?? new Date().toISOString(),
      };

      const u = created.user;
      const roleId = Number(u?.role?.id ?? NaN);
      const userId = Number(u?.id ?? NaN);

      if (!Number.isNaN(roleId) && !Number.isNaN(userId)) {
        if (roleId === RoleEnum.supplier) {
          const supplier = await this.suppliersService.findByUserId(userId);
          if (supplier?.id) {
            this.notificationsGateway.notifySupplier(supplier.id, payload);
          }
        } else if (roleId === RoleEnum.consignee) {
          const consignee = await this.consigneesService.findByUserId(userId);
          if (consignee?.id) {
            this.notificationsGateway.notifyConsignee(consignee.id, payload);
          }
        } else if (roleId === RoleEnum.manager) {
          const manager = await this.managersService.findByUserId(userId);
          if (manager?.id) {
            this.notificationsGateway.notifyManager(manager.id, payload);
          }
        } else if (roleId === RoleEnum.staff) {
          const staff = await this.staffsService.findByUserId(userId);
          if (staff?.id) {
            this.notificationsGateway.notifyStaff(staff.id, payload);
          }
        } else if (roleId === RoleEnum.delivery_staff) {
          const ds = await this.deliveryStaffsService.findByUserId(userId);
          if (ds?.id) {
            this.notificationsGateway.notifyDeliveryStaff(ds.id, payload);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }

    return created;
  }

  findAllWithPagination({
    paginationOptions,
    userId,
  }: {
    paginationOptions: IPaginationOptions;
    userId?: number;
  }) {
    return this.notificationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      userId,
    });
  }

  findById(id: Notification['id']) {
    return this.notificationRepository.findById(id);
  }

  findByIds(ids: Notification['id'][]) {
    return this.notificationRepository.findByIds(ids);
  }

  async update(
    id: Notification['id'],

    updateNotificationDto: UpdateNotificationDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let user: User | null | undefined = undefined;

    if (updateNotificationDto.user) {
      const userObject = await this.userService.findById(
        updateNotificationDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (updateNotificationDto.user === null) {
      user = null;
    }

    return this.notificationRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      user,

      deletedAt: updateNotificationDto.deletedAt,

      isRead: updateNotificationDto.isRead,

      type: updateNotificationDto.type,

      message: updateNotificationDto.message,

      title: updateNotificationDto.title,
    });
  }

  remove(id: Notification['id']) {
    return this.notificationRepository.remove(id);
  }
}
