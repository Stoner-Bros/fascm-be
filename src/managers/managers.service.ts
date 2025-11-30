import { WarehousesService } from '../warehouses/warehouses.service';
import { Warehouse } from '../warehouses/domain/warehouse';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerRepository } from './infrastructure/persistence/manager.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Manager } from './domain/manager';
import { AuthService } from 'src/auth/auth.service';
import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class ManagersService {
  constructor(
    private readonly warehouseService: WarehousesService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,

    // Dependencies here
    private readonly managerRepository: ManagerRepository,
  ) {}

  async create(createManagerDto: CreateManagerDto) {
    // Do not remove comment below.
    // <creating-property />
    let warehouse: Warehouse | null | undefined = undefined;

    if (createManagerDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        createManagerDto.warehouse.id,
      );
      if (!warehouseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            warehouse: 'notExists',
          },
        });
      }
      warehouse = warehouseObject;
    } else if (createManagerDto.warehouse === null) {
      warehouse = null;
    }

    let user: User | null | undefined = undefined;

    if (createManagerDto.user) {
      const userObject = await this.authService.register(
        createManagerDto.user,
        RoleEnum.manager,
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
    } else if (createManagerDto.user === null) {
      user = null;
    }

    return this.managerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      warehouse,

      user,
    });
  }

  async findByUserId(userId: string) {
    return this.managerRepository.findByUserId(userId);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.managerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Manager['id']) {
    return this.managerRepository.findById(id);
  }

  findByIds(ids: Manager['id'][]) {
    return this.managerRepository.findByIds(ids);
  }

  async update(
    id: Manager['id'],

    updateManagerDto: UpdateManagerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let warehouse: Warehouse | null | undefined = undefined;

    if (updateManagerDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        updateManagerDto.warehouse.id,
      );
      if (!warehouseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            warehouse: 'notExists',
          },
        });
      }
      warehouse = warehouseObject;
    } else if (updateManagerDto.warehouse === null) {
      warehouse = null;
    }

    let user: User | null | undefined = undefined;

    if (updateManagerDto.user) {
      const userObject = await this.userService.findById(
        updateManagerDto.user.id,
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
    } else if (updateManagerDto.user === null) {
      user = null;
    }

    return this.managerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      warehouse,

      user,
    });
  }

  remove(id: Manager['id']) {
    return this.managerRepository.remove(id);
  }
}
