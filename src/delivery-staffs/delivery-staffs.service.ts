import { TrucksService } from '../trucks/trucks.service';
import { Truck } from '../trucks/domain/truck';

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
import { CreateDeliveryStaffDto } from './dto/create-delivery-staff.dto';
import { UpdateDeliveryStaffDto } from './dto/update-delivery-staff.dto';
import { DeliveryStaffRepository } from './infrastructure/persistence/delivery-staff.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { DeliveryStaff } from './domain/delivery-staff';
import { AuthService } from 'src/auth/auth.service';
import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class DeliveryStaffsService {
  constructor(
    private readonly truckService: TrucksService,
    private readonly authService: AuthService,
    private readonly warehouseService: WarehousesService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly deliveryStaffRepository: DeliveryStaffRepository,
  ) {}

  async create(createDeliveryStaffDto: CreateDeliveryStaffDto) {
    // Do not remove comment below.
    // <creating-property />
    let truck: Truck | null | undefined = undefined;

    if (createDeliveryStaffDto.truck) {
      const truckObject = await this.truckService.findById(
        createDeliveryStaffDto.truck.id,
      );
      if (!truckObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            truck: 'notExists',
          },
        });
      }
      truck = truckObject;
    } else if (createDeliveryStaffDto.truck === null) {
      truck = null;
    }

    let warehouse: Warehouse | null | undefined = undefined;

    if (createDeliveryStaffDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        createDeliveryStaffDto.warehouse.id,
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
    } else if (createDeliveryStaffDto.warehouse === null) {
      warehouse = null;
    }

    const userObject = await this.authService.register(
      createDeliveryStaffDto.user,
    );

    userObject.role = { id: RoleEnum.delivery_staff };
    await this.userService.update(userObject.id, userObject);

    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    return this.deliveryStaffRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      truck,

      warehouse,

      licenseExpiredAt: createDeliveryStaffDto.licenseExpiredAt,

      licensePhoto: createDeliveryStaffDto.licensePhoto,

      licenseNumber: createDeliveryStaffDto.licenseNumber,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.deliveryStaffRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: DeliveryStaff['id']) {
    return this.deliveryStaffRepository.findById(id);
  }

  findByIds(ids: DeliveryStaff['id'][]) {
    return this.deliveryStaffRepository.findByIds(ids);
  }

  async update(
    id: DeliveryStaff['id'],

    updateDeliveryStaffDto: UpdateDeliveryStaffDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let truck: Truck | null | undefined = undefined;

    if (updateDeliveryStaffDto.truck) {
      const truckObject = await this.truckService.findById(
        updateDeliveryStaffDto.truck.id,
      );
      if (!truckObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            truck: 'notExists',
          },
        });
      }
      truck = truckObject;
    } else if (updateDeliveryStaffDto.truck === null) {
      truck = null;
    }

    let warehouse: Warehouse | null | undefined = undefined;

    if (updateDeliveryStaffDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        updateDeliveryStaffDto.warehouse.id,
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
    } else if (updateDeliveryStaffDto.warehouse === null) {
      warehouse = null;
    }

    let user: User | undefined = undefined;

    if (updateDeliveryStaffDto.user) {
      const userObject = await this.userService.findById(
        updateDeliveryStaffDto.user.id,
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
    }

    return this.deliveryStaffRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      truck,

      warehouse,

      licenseExpiredAt: updateDeliveryStaffDto.licenseExpiredAt,

      licensePhoto: updateDeliveryStaffDto.licensePhoto,

      licenseNumber: updateDeliveryStaffDto.licenseNumber,

      user,
    });
  }

  remove(id: DeliveryStaff['id']) {
    return this.deliveryStaffRepository.remove(id);
  }
}
