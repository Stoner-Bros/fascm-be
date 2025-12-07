import { OrderSchedulesService } from '../order-schedules/order-schedules.service';
import { OrderSchedule } from '../order-schedules/domain/order-schedule';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderPhaseDto } from './dto/create-order-phase.dto';
import { UpdateOrderPhaseDto } from './dto/update-order-phase.dto';
import { OrderPhaseRepository } from './infrastructure/persistence/order-phase.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderPhase } from './domain/order-phase';

@Injectable()
export class OrderPhasesService {
  constructor(
    private readonly orderScheduleService: OrderSchedulesService,

    // Dependencies here
    private readonly orderPhaseRepository: OrderPhaseRepository,
  ) {}

  async create(createOrderPhaseDto: CreateOrderPhaseDto) {
    // Do not remove comment below.
    // <creating-property />

    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (createOrderPhaseDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        createOrderPhaseDto.orderSchedule.id,
      );
      if (!orderScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderSchedule: 'notExists',
          },
        });
      }
      orderSchedule = orderScheduleObject;
    } else if (createOrderPhaseDto.orderSchedule === null) {
      orderSchedule = null;
    }

    return this.orderPhaseRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createOrderPhaseDto.description,

      status: createOrderPhaseDto.status,

      phaseNumber: createOrderPhaseDto.phaseNumber,

      orderSchedule,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderPhaseRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderPhase['id']) {
    return this.orderPhaseRepository.findById(id);
  }

  findByIds(ids: OrderPhase['id'][]) {
    return this.orderPhaseRepository.findByIds(ids);
  }

  async update(
    id: OrderPhase['id'],

    updateOrderPhaseDto: UpdateOrderPhaseDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (updateOrderPhaseDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        updateOrderPhaseDto.orderSchedule.id,
      );
      if (!orderScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderSchedule: 'notExists',
          },
        });
      }
      orderSchedule = orderScheduleObject;
    } else if (updateOrderPhaseDto.orderSchedule === null) {
      orderSchedule = null;
    }

    return this.orderPhaseRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateOrderPhaseDto.description,

      status: updateOrderPhaseDto.status,

      phaseNumber: updateOrderPhaseDto.phaseNumber,

      orderSchedule,
    });
  }

  remove(id: OrderPhase['id']) {
    return this.orderPhaseRepository.remove(id);
  }
}
