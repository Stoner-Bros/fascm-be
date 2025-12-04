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
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DeliveryRepository } from './infrastructure/persistence/delivery.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Delivery } from './domain/delivery';
import { DeliveryStatusEnum } from './enum/delivery-status.enum';
import { HarvestScheduleStatusEnum } from 'src/harvest-schedules/enum/harvest-schedule-status.enum';
import { OrderScheduleStatusEnum } from 'src/order-schedules/enum/order-schedule-status.enum';
import { TruckStatusEnum } from 'src/trucks/enum/truck-status.enum';

@Injectable()
export class DeliveriesService {
  constructor(
    private readonly truckService: TrucksService,

    @Inject(forwardRef(() => HarvestSchedulesService))
    private readonly harvestScheduleService: HarvestSchedulesService,

    private readonly orderScheduleService: OrderSchedulesService,

    // Dependencies here
    private readonly deliveryRepository: DeliveryRepository,
  ) {}

  private async resolveCoords(
    address?: string | null,
  ): Promise<{ lat: number; lon: number } | null> {
    try {
      const q = (address ?? '').trim();
      if (!q) return null;
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'capstone-app' },
      });
      const arr = await res.json();
      if (Array.isArray(arr) && arr.length > 0) {
        const item = arr[0];
        const lat = Number(item.lat);
        const lon = Number(item.lon);
        if (!Number.isNaN(lat) && !Number.isNaN(lon)) return { lat, lon };
      }
    } catch {}
    return null;
  }

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

    if (
      createDeliveryDto.endAddress &&
      (createDeliveryDto.endLat == null || createDeliveryDto.endLng == null)
    ) {
      const c = await this.resolveCoords(createDeliveryDto.endAddress);
      if (c) {
        createDeliveryDto.endLat = c.lat;
        createDeliveryDto.endLng = c.lon;
      }
    }
    if (
      createDeliveryDto.startAddress &&
      (createDeliveryDto.startLat == null || createDeliveryDto.startLng == null)
    ) {
      const c = await this.resolveCoords(createDeliveryDto.startAddress);
      if (c) {
        createDeliveryDto.startLat = c.lat;
        createDeliveryDto.startLng = c.lon;
      }
    }

    if (createDeliveryDto.harvestSchedule) {
      if (harvestSchedule?.status !== HarvestScheduleStatusEnum.PREPARING) {
        await this.harvestScheduleService.updateStatus(
          createDeliveryDto.harvestSchedule.id,
          HarvestScheduleStatusEnum.PREPARING,
        );
      }
    }
    if (createDeliveryDto.orderSchedule) {
      if (orderSchedule?.status !== OrderScheduleStatusEnum.PREPARING) {
        await this.orderScheduleService.updateStatus(
          createDeliveryDto.orderSchedule.id,
          OrderScheduleStatusEnum.PREPARING,
        );
      }
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

      status: DeliveryStatusEnum.SCHEDULED,

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
    filters?: { orderScheduleId?: string; harvestScheduleId?: string };
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

  findByOrderScheduleId(orderScheduleId: OrderSchedule['id']) {
    return this.deliveryRepository.findByOrderScheduleId(orderScheduleId);
  }

  findByHarvestScheduleId(harvestScheduleId: HarvestSchedule['id']) {
    return this.deliveryRepository.findByHarvestScheduleId(harvestScheduleId);
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

    if (
      updateDeliveryDto.endAddress &&
      (updateDeliveryDto.endLat == null || updateDeliveryDto.endLng == null)
    ) {
      const c = await this.resolveCoords(updateDeliveryDto.endAddress);
      if (c) {
        updateDeliveryDto.endLat = c.lat;
        updateDeliveryDto.endLng = c.lon;
      }
    }
    if (
      updateDeliveryDto.startAddress &&
      (updateDeliveryDto.startLat == null || updateDeliveryDto.startLng == null)
    ) {
      const c = await this.resolveCoords(updateDeliveryDto.startAddress);
      if (c) {
        updateDeliveryDto.startLat = c.lat;
        updateDeliveryDto.startLng = c.lon;
      }
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

      startTime: updateDeliveryDto.startTime,

      truck,

      harvestSchedule,

      orderSchedule,
    });
  }

  remove(id: Delivery['id']) {
    return this.deliveryRepository.remove(id);
  }

  async updateStatus(id: Delivery['id'], status: Delivery['status']) {
    const delivery = await this.deliveryRepository.findById(id);

    if (!delivery) {
      throw new UnprocessableEntityException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = delivery.status;

    const allowedTransitions: Record<string, DeliveryStatusEnum[]> = {
      scheduled: [DeliveryStatusEnum.DELIVERING, DeliveryStatusEnum.CANCELED],
      delivering: [DeliveryStatusEnum.DELIVERED, DeliveryStatusEnum.CANCELED],
      delivered: [DeliveryStatusEnum.RETURNING, DeliveryStatusEnum.CANCELED],
      returning: [DeliveryStatusEnum.COMPLETED, DeliveryStatusEnum.CANCELED],
      completed: [],
      canceled: [],
    };

    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as DeliveryStatusEnum,
      )
    ) {
      throw new BadRequestException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          status: `invalidTransitionFrom${currentStatus}To${status}`,
        },
      });
    }

    switch (status) {
      case DeliveryStatusEnum.SCHEDULED:
        if (delivery.harvestSchedule) {
          if (
            delivery.harvestSchedule.status !==
            HarvestScheduleStatusEnum.PREPARING
          ) {
            await this.harvestScheduleService.updateStatus(
              delivery.harvestSchedule.id,
              HarvestScheduleStatusEnum.PREPARING,
            );
          }
        }
        if (delivery.orderSchedule) {
          if (
            delivery.orderSchedule.status !== OrderScheduleStatusEnum.PREPARING
          ) {
            await this.orderScheduleService.updateStatus(
              delivery.orderSchedule.id,
              OrderScheduleStatusEnum.PREPARING,
            );
          }
        }
        if (delivery.truck) {
          const cur = delivery.truck.status as TruckStatusEnum | undefined;
          if (cur !== TruckStatusEnum.IN_USE) {
            await this.truckService.updateStatus(
              delivery.truck.id,
              TruckStatusEnum.IN_USE,
            );
          }
        }
        break;
      case DeliveryStatusEnum.DELIVERING:
        if (delivery.harvestSchedule) {
          if (
            delivery.harvestSchedule.status !==
            HarvestScheduleStatusEnum.DELIVERING
          ) {
            await this.harvestScheduleService.updateStatus(
              delivery.harvestSchedule.id,
              HarvestScheduleStatusEnum.DELIVERING,
            );
          }
        }
        if (delivery.orderSchedule) {
          if (
            delivery.orderSchedule.status !== OrderScheduleStatusEnum.DELIVERING
          ) {
            await this.orderScheduleService.updateStatus(
              delivery.orderSchedule.id,
              OrderScheduleStatusEnum.DELIVERING,
            );
          }
        }
        break;
      case DeliveryStatusEnum.DELIVERED:
        if (delivery.harvestSchedule) {
          if (
            delivery.harvestSchedule.status !==
            HarvestScheduleStatusEnum.DELIVERED
          ) {
            await this.harvestScheduleService.updateStatus(
              delivery.harvestSchedule.id,
              HarvestScheduleStatusEnum.DELIVERED,
            );
          }
        }
        if (delivery.orderSchedule) {
          if (
            delivery.orderSchedule.status !== OrderScheduleStatusEnum.DELIVERED
          ) {
            await this.orderScheduleService.updateStatus(
              delivery.orderSchedule.id,
              OrderScheduleStatusEnum.DELIVERED,
            );
          }
        }
        break;
      case DeliveryStatusEnum.COMPLETED:
        if (delivery.truck) {
          const cur = delivery.truck.status as TruckStatusEnum | undefined;
          if (cur !== TruckStatusEnum.AVAILABLE) {
            await this.truckService.updateStatus(
              delivery.truck.id,
              TruckStatusEnum.AVAILABLE,
            );
          }
        }
        break;
      case DeliveryStatusEnum.CANCELED:
        if (delivery.truck) {
          const cur = delivery.truck.status as TruckStatusEnum | undefined;
          if (cur !== TruckStatusEnum.AVAILABLE) {
            await this.truckService.updateStatus(
              delivery.truck.id,
              TruckStatusEnum.AVAILABLE,
            );
          }
        }
        break;
    }

    const updateData: Partial<Delivery> = {
      status,
      updatedAt: new Date(),
    };

    if (status === DeliveryStatusEnum.COMPLETED) {
      updateData.endTime = new Date();
    }

    return this.deliveryRepository.update(id, updateData);
  }
}
