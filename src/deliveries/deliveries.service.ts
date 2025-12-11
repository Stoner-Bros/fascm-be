import { Truck } from '../trucks/domain/truck';
import { TrucksService } from '../trucks/trucks.service';

import {
  BadRequestException,
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DeliveryStaffsService } from 'src/delivery-staffs/delivery-staffs.service';
import { DeliveryStaff } from 'src/delivery-staffs/domain/delivery-staff';
import { HarvestPhase } from 'src/harvest-phases/domain/harvest-phase';
import { HarvestPhaseStatusEnum } from 'src/harvest-phases/enum/harvest-phase-status.enum';
import { HarvestPhasesService } from 'src/harvest-phases/harvest-phases.service';
import { OrderPhase } from 'src/order-phases/domain/order-phase';
import { OrderPhaseStatusEnum } from 'src/order-phases/enum/order-phase-status.enum';
import { OrderPhasesService } from 'src/order-phases/order-phases.service';
import { TruckStatusEnum } from 'src/trucks/enum/truck-status.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Delivery } from './domain/delivery';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DeliveryStatusEnum } from './enum/delivery-status.enum';
import { DeliveryRepository } from './infrastructure/persistence/delivery.repository';

@Injectable()
export class DeliveriesService {
  constructor(
    private readonly truckService: TrucksService,
    private readonly deliveryStaffService: DeliveryStaffsService,
    @Inject(forwardRef(() => HarvestPhasesService))
    private readonly harvestPhaseService: HarvestPhasesService,
    @Inject(forwardRef(() => OrderPhasesService))
    private readonly orderPhaseService: OrderPhasesService,

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

    let deliveryStaff: DeliveryStaff | null | undefined = undefined;

    if (createDeliveryDto.deliveryStaff) {
      const deliveryStaffObject = await this.deliveryStaffService.findById(
        createDeliveryDto.deliveryStaff.id,
      );
      if (!deliveryStaffObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            deliveryStaff: 'notExists',
          },
        });
      }
      deliveryStaff = deliveryStaffObject;
    } else if (createDeliveryDto.deliveryStaff === null) {
      deliveryStaff = null;
    }

    let harvestPhase: HarvestPhase | null | undefined = undefined;

    if (createDeliveryDto.harvestPhase) {
      const harvestPhaseObject = await this.harvestPhaseService.findById(
        createDeliveryDto.harvestPhase.id,
      );
      if (!harvestPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestPhase: 'notExists',
          },
        });
      }
      harvestPhase = harvestPhaseObject;
    } else if (createDeliveryDto.harvestPhase === null) {
      harvestPhase = null;
    }

    let orderPhase: OrderPhase | null | undefined = undefined;

    if (createDeliveryDto.orderPhase) {
      const orderPhaseObject = await this.orderPhaseService.findById(
        createDeliveryDto.orderPhase.id,
      );
      if (!orderPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderPhase: 'notExists',
          },
        });
      }
      orderPhase = orderPhaseObject;
    } else if (createDeliveryDto.orderPhase === null) {
      orderPhase = null;
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

    if (createDeliveryDto.harvestPhase) {
      if (harvestPhase?.status !== HarvestPhaseStatusEnum.PREPARING) {
        await this.harvestPhaseService.updateStatus(
          createDeliveryDto.harvestPhase.id,
          HarvestPhaseStatusEnum.PREPARING,
        );
      }
    }
    if (createDeliveryDto.orderPhase) {
      if (orderPhase?.status !== OrderPhaseStatusEnum.PREPARING) {
        await this.orderPhaseService.updateStatus(
          createDeliveryDto.orderPhase.id,
          OrderPhaseStatusEnum.PREPARING,
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

      deliveryStaff,

      harvestPhase,

      orderPhase,
    });
  }

  findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { orderPhaseId?: string; harvestPhaseId?: string };
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

  findByOrderPhaseId(orderPhaseId: OrderPhase['id']) {
    return this.deliveryRepository.findByOrderPhaseId(orderPhaseId);
  }

  findByHarvestPhaseId(harvestPhaseId: HarvestPhase['id']) {
    return this.deliveryRepository.findByHarvestPhaseId(harvestPhaseId);
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

    let deliveryStaff: DeliveryStaff | null | undefined = undefined;

    if (updateDeliveryDto.deliveryStaff) {
      const deliveryStaffObject = await this.deliveryStaffService.findById(
        updateDeliveryDto.deliveryStaff.id,
      );
      if (!deliveryStaffObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            deliveryStaff: 'notExists',
          },
        });
      }
      deliveryStaff = deliveryStaffObject;
    } else if (updateDeliveryDto.deliveryStaff === null) {
      deliveryStaff = null;
    }

    let harvestPhase: HarvestPhase | null | undefined = undefined;

    if (updateDeliveryDto.harvestPhase) {
      const harvestPhaseObject = await this.harvestPhaseService.findById(
        updateDeliveryDto.harvestPhase.id,
      );
      if (!harvestPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestPhase: 'notExists',
          },
        });
      }
      harvestPhase = harvestPhaseObject;
    } else if (updateDeliveryDto.harvestPhase === null) {
      harvestPhase = null;
    }

    let orderPhase: OrderPhase | null | undefined = undefined;

    if (updateDeliveryDto.orderPhase) {
      const orderPhaseObject = await this.orderPhaseService.findById(
        updateDeliveryDto.orderPhase.id,
      );
      if (!orderPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderPhase: 'notExists',
          },
        });
      }
      orderPhase = orderPhaseObject;
    } else if (updateDeliveryDto.orderPhase === null) {
      orderPhase = null;
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

      deliveryStaff,

      harvestPhase,

      orderPhase,
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
        if (delivery.harvestPhase) {
          if (
            delivery.harvestPhase.status !== HarvestPhaseStatusEnum.PREPARING
          ) {
            await this.harvestPhaseService.updateStatus(
              delivery.harvestPhase.id,
              HarvestPhaseStatusEnum.PREPARING,
            );
          }
        }
        if (delivery.orderPhase) {
          if (delivery.orderPhase.status !== OrderPhaseStatusEnum.PREPARING) {
            await this.orderPhaseService.updateStatus(
              delivery.orderPhase.id,
              OrderPhaseStatusEnum.PREPARING,
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
        if (delivery.harvestPhase) {
          if (
            delivery.harvestPhase.status !== HarvestPhaseStatusEnum.DELIVERING
          ) {
            await this.harvestPhaseService.updateStatus(
              delivery.harvestPhase.id,
              HarvestPhaseStatusEnum.DELIVERING,
            );
          }
        }
        if (delivery.orderPhase) {
          if (delivery.orderPhase.status !== OrderPhaseStatusEnum.DELIVERING) {
            await this.orderPhaseService.updateStatus(
              delivery.orderPhase.id,
              OrderPhaseStatusEnum.DELIVERING,
            );
          }
        }
        break;
      case DeliveryStatusEnum.DELIVERED:
        if (delivery.harvestPhase) {
          if (
            delivery.harvestPhase.status !== HarvestPhaseStatusEnum.DELIVERED
          ) {
            await this.harvestPhaseService.updateStatus(
              delivery.harvestPhase.id,
              HarvestPhaseStatusEnum.DELIVERED,
            );
          }
        }
        if (delivery.orderPhase) {
          if (delivery.orderPhase.status !== OrderPhaseStatusEnum.DELIVERED) {
            await this.orderPhaseService.updateStatus(
              delivery.orderPhase.id,
              OrderPhaseStatusEnum.DELIVERED,
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
