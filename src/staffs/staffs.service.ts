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
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRepository } from './infrastructure/persistence/staff.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Staff } from './domain/staff';

@Injectable()
export class StaffsService {
  constructor(
    private readonly warehouseService: WarehousesService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly staffRepository: StaffRepository,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    // Do not remove comment below.
    // <creating-property />
    let warehouse: Warehouse | null | undefined = undefined;

    if (createStaffDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        createStaffDto.warehouse.id,
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
    } else if (createStaffDto.warehouse === null) {
      warehouse = null;
    }

    let user: User | null | undefined = undefined;

    if (createStaffDto.user) {
      const userObject = await this.userService.findById(
        createStaffDto.user.id,
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
    } else if (createStaffDto.user === null) {
      user = null;
    }

    return this.staffRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      warehouse,

      position: createStaffDto.position,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.staffRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Staff['id']) {
    return this.staffRepository.findById(id);
  }

  findByIds(ids: Staff['id'][]) {
    return this.staffRepository.findByIds(ids);
  }

  async update(
    id: Staff['id'],

    updateStaffDto: UpdateStaffDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let warehouse: Warehouse | null | undefined = undefined;

    if (updateStaffDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        updateStaffDto.warehouse.id,
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
    } else if (updateStaffDto.warehouse === null) {
      warehouse = null;
    }

    let user: User | null | undefined = undefined;

    if (updateStaffDto.user) {
      const userObject = await this.userService.findById(
        updateStaffDto.user.id,
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
    } else if (updateStaffDto.user === null) {
      user = null;
    }

    return this.staffRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      warehouse,

      position: updateStaffDto.position,

      user,
    });
  }

  remove(id: Staff['id']) {
    return this.staffRepository.remove(id);
  }
}
