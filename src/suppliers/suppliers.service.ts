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

@Injectable()
export class SuppliersService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly supplierRepository: SupplierRepository,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    // Do not remove comment below.
    // <creating-property />
    const userObject = await this.userService.findById(
      createSupplierDto.user.id,
    );
    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    return this.supplierRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
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
