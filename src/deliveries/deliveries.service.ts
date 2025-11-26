import { TrucksService } from '../trucks/trucks.service';
import { Truck } from '../trucks/domain/truck';

import { HarvestSchedulesService } from '../harvest-schedules/harvest-schedules.service';
import { HarvestSchedule } from '../harvest-schedules/domain/harvest-schedule';

import { OrderSchedulesService } from '../order-schedules/order-schedules.service';
import { OrderSchedule } from '../order-schedules/domain/order-schedule';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DeliveryRepository } from './infrastructure/persistence/delivery.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Delivery } from './domain/delivery';

@Injectable()
export class DeliveriesService {
  constructor(
    private readonly truckService: TrucksService,

    private readonly harvestScheduleService: HarvestSchedulesService,

    private readonly orderScheduleService: OrderSchedulesService,

    // Dependencies here
    private readonly deliveryRepository: DeliveryRepository,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    // Do not remove comment below.
    // <creating-property />

    let truck: Truck | null | undefined = undefined;

    if (createDeliveryDto.truck) {
      const truckObject = await this.truckService.findById(
        createDeliveryDto.truck.id,
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
    } else if (createDeliveryDto.truck === null) {
      truck = null;
    }

    let harvestSchedule: HarvestSchedule | null | undefined = undefined;

    if (createDeliveryDto.harvestSchedule) {
      const harvestScheduleObject = await this.harvestScheduleService.findById(
        createDeliveryDto.harvestSchedule.id,
      );
      if (!harvestScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestSchedule: 'notExists',
          },
        });
      }
      harvestSchedule = harvestScheduleObject;
    } else if (createDeliveryDto.harvestSchedule === null) {
      harvestSchedule = null;
    }

    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (createDeliveryDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        createDeliveryDto.orderSchedule.id,
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
    } else if (createDeliveryDto.orderSchedule === null) {
      orderSchedule = null;
    }

    return this.deliveryRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      endLng: createDeliveryDto.endLng,

      endLat: createDeliveryDto.endLat,

      startLng: createDeliveryDto.startLng,

      startLat: createDeliveryDto.startLat,

      endAddress: createDeliveryDto.endAddress,

      startAddress: createDeliveryDto.startAddress,

      status: createDeliveryDto.status,

      endTime: createDeliveryDto.endTime,

      startTime: createDeliveryDto.startTime,

      truck,

      harvestSchedule,

      orderSchedule,
    });
  }

  findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { orderScheduleId?: string };
  }) {
    return this.deliveryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
    });
  }

  findById(id: Delivery['id']) {
    return this.deliveryRepository.findById(id);
  }

  findByIds(ids: Delivery['id'][]) {
    return this.deliveryRepository.findByIds(ids);
  }

  async update(
    id: Delivery['id'],

    updateDeliveryDto: UpdateDeliveryDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let truck: Truck | null | undefined = undefined;

    if (updateDeliveryDto.truck) {
      const truckObject = await this.truckService.findById(
        updateDeliveryDto.truck.id,
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
    } else if (updateDeliveryDto.truck === null) {
      truck = null;
    }

    let harvestSchedule: HarvestSchedule | null | undefined = undefined;

    if (updateDeliveryDto.harvestSchedule) {
      const harvestScheduleObject = await this.harvestScheduleService.findById(
        updateDeliveryDto.harvestSchedule.id,
      );
      if (!harvestScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestSchedule: 'notExists',
          },
        });
      }
      harvestSchedule = harvestScheduleObject;
    } else if (updateDeliveryDto.harvestSchedule === null) {
      harvestSchedule = null;
    }

    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (updateDeliveryDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        updateDeliveryDto.orderSchedule.id,
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
    } else if (updateDeliveryDto.orderSchedule === null) {
      orderSchedule = null;
    }

    return this.deliveryRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      endLng: updateDeliveryDto.endLng,

      endLat: updateDeliveryDto.endLat,

      startLng: updateDeliveryDto.startLng,

      startLat: updateDeliveryDto.startLat,

      endAddress: updateDeliveryDto.endAddress,

      startAddress: updateDeliveryDto.startAddress,

      status: updateDeliveryDto.status,

      endTime: updateDeliveryDto.endTime,

      startTime: updateDeliveryDto.startTime,

      truck,

      harvestSchedule,

      orderSchedule,
    });
  }

  remove(id: Delivery['id']) {
    return this.deliveryRepository.remove(id);
  }
}
