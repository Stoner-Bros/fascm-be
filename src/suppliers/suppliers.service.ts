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
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierRepository } from './infrastructure/persistence/supplier.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Supplier } from './domain/supplier';
import { AuthService } from 'src/auth/auth.service';
import { RoleEnum } from 'src/roles/roles.enum';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly warehouseService: WarehousesService,

    private readonly userService: UsersService,
    private readonly authService: AuthService,

    // Dependencies here
    private readonly supplierRepository: SupplierRepository,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    // Do not remove comment below.
    // <creating-property />
    let warehouse: Warehouse | null | undefined = undefined;

    if (createSupplierDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        createSupplierDto.warehouse.id,
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
    } else if (createSupplierDto.warehouse === null) {
      warehouse = null;
    }

    let user: User | null | undefined = undefined;

    if (createSupplierDto.user) {
      const userObject = await this.authService.register(
        createSupplierDto.user,
        RoleEnum.supplier,
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
    } else if (createSupplierDto.user === null) {
      user = null;
    }

    return this.supplierRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      warehouse,

      user,

      contact: createSupplierDto.contact,

      taxCode: createSupplierDto.taxCode,

      address: createSupplierDto.address,

      certificate: createSupplierDto.certificate,

      qrCode: createSupplierDto.qrCode,

      gardenName: createSupplierDto.gardenName,

      representativeName: createSupplierDto.representativeName,
    });
  }

  async findByUserId(userId: number): Promise<NullableType<Supplier>> {
    return this.supplierRepository.findByUserId(userId);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Supplier['id']) {
    return this.supplierRepository.findById(id);
  }

  findByIds(ids: Supplier['id'][]) {
    return this.supplierRepository.findByIds(ids);
  }

  async update(
    id: Supplier['id'],

    updateSupplierDto: UpdateSupplierDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let warehouse: Warehouse | null | undefined = undefined;

    if (updateSupplierDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        updateSupplierDto.warehouse.id,
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
    } else if (updateSupplierDto.warehouse === null) {
      warehouse = null;
    }

    let user: User | undefined = undefined;

    if (updateSupplierDto.user) {
      const userObject = await this.userService.findById(
        updateSupplierDto.user.id,
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

    return this.supplierRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      warehouse,

      user,

      contact: updateSupplierDto.contact,

      taxCode: updateSupplierDto.taxCode,

      address: updateSupplierDto.address,

      certificate: updateSupplierDto.certificate,

      qrCode: updateSupplierDto.qrCode,

      gardenName: updateSupplierDto.gardenName,

      representativeName: updateSupplierDto.representativeName,
    });
  }

  remove(id: Supplier['id']) {
    return this.supplierRepository.remove(id);
  }
}
