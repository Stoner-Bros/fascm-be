import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateConsigneeDto } from './dto/create-consignee.dto';
import { UpdateConsigneeDto } from './dto/update-consignee.dto';
import { ConsigneeRepository } from './infrastructure/persistence/consignee.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Consignee } from './domain/consignee';

@Injectable()
export class ConsigneesService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly consigneeRepository: ConsigneeRepository,
  ) {}

  async create(createConsigneeDto: CreateConsigneeDto) {
    // Do not remove comment below.
    // <creating-property />

    let user: User | null | undefined = undefined;

    if (createConsigneeDto.user) {
      const userObject = await this.userService.findById(
        createConsigneeDto.user.id,
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
    } else if (createConsigneeDto.user === null) {
      user = null;
    }

    return this.consigneeRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      contact: createConsigneeDto.contact,

      taxCode: createConsigneeDto.taxCode,

      address: createConsigneeDto.address,

      certificate: createConsigneeDto.certificate,

      qrCode: createConsigneeDto.qrCode,

      organizationName: createConsigneeDto.organizationName,

      representativeName: createConsigneeDto.representativeName,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.consigneeRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Consignee['id']) {
    return this.consigneeRepository.findById(id);
  }

  findByIds(ids: Consignee['id'][]) {
    return this.consigneeRepository.findByIds(ids);
  }

  async update(
    id: Consignee['id'],

    updateConsigneeDto: UpdateConsigneeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | null | undefined = undefined;

    if (updateConsigneeDto.user) {
      const userObject = await this.userService.findById(
        updateConsigneeDto.user.id,
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
    } else if (updateConsigneeDto.user === null) {
      user = null;
    }

    return this.consigneeRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      contact: updateConsigneeDto.contact,

      taxCode: updateConsigneeDto.taxCode,

      address: updateConsigneeDto.address,

      certificate: updateConsigneeDto.certificate,

      qrCode: updateConsigneeDto.qrCode,

      organizationName: updateConsigneeDto.organizationName,

      representativeName: updateConsigneeDto.representativeName,

      user,
    });
  }

  remove(id: Consignee['id']) {
    return this.consigneeRepository.remove(id);
  }
}
