import { ConsigneesService } from '../consignees/consignees.service';
import { Consignee } from '../consignees/domain/consignee';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderScheduleDto } from './dto/create-order-schedule.dto';
import { UpdateOrderScheduleDto } from './dto/update-order-schedule.dto';
import { OrderScheduleRepository } from './infrastructure/persistence/order-schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderSchedule } from './domain/order-schedule';

@Injectable()
export class OrderSchedulesService {
  constructor(
    private readonly consigneeService: ConsigneesService,

    // Dependencies here
    private readonly orderScheduleRepository: OrderScheduleRepository,
  ) {}

  async create(createOrderScheduleDto: CreateOrderScheduleDto) {
    // Do not remove comment below.
    // <creating-property />

    let consignee: Consignee | null | undefined = undefined;

    if (createOrderScheduleDto.consignee) {
      const consigneeObject = await this.consigneeService.findById(
        createOrderScheduleDto.consignee.id,
      );
      if (!consigneeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            consignee: 'notExists',
          },
        });
      }
      consignee = consigneeObject;
    } else if (createOrderScheduleDto.consignee === null) {
      consignee = null;
    }

    return this.orderScheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createOrderScheduleDto.description,

      status: createOrderScheduleDto.status,

      orderDate: createOrderScheduleDto.orderDate,

      consignee,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderScheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderSchedule['id']) {
    return this.orderScheduleRepository.findById(id);
  }

  findByIds(ids: OrderSchedule['id'][]) {
    return this.orderScheduleRepository.findByIds(ids);
  }

  async update(
    id: OrderSchedule['id'],

    updateOrderScheduleDto: UpdateOrderScheduleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let consignee: Consignee | null | undefined = undefined;

    if (updateOrderScheduleDto.consignee) {
      const consigneeObject = await this.consigneeService.findById(
        updateOrderScheduleDto.consignee.id,
      );
      if (!consigneeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            consignee: 'notExists',
          },
        });
      }
      consignee = consigneeObject;
    } else if (updateOrderScheduleDto.consignee === null) {
      consignee = null;
    }

    return this.orderScheduleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateOrderScheduleDto.description,

      status: updateOrderScheduleDto.status,

      orderDate: updateOrderScheduleDto.orderDate,

      consignee,
    });
  }

  remove(id: OrderSchedule['id']) {
    return this.orderScheduleRepository.remove(id);
  }
}
