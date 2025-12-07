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

@Injectable()
export class NotificationsService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly notificationRepository: NotificationRepository,
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

    return this.notificationRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      user,

      deletedAt: createNotificationDto.deletedAt,

      isRead: createNotificationDto.isRead,

      type: createNotificationDto.type,

      message: createNotificationDto.message,

      title: createNotificationDto.title,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.notificationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
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
