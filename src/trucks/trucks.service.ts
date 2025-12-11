import { WarehousesService } from '../warehouses/warehouses.service';
import { Warehouse } from '../warehouses/domain/warehouse';

import { IoTDevice } from '../io-t-devices/domain/io-t-device';
import { IoTDevicesService } from '../io-t-devices/io-t-devices.service';

import {
  BadRequestException,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Truck } from './domain/truck';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { TruckStatusEnum } from './enum/truck-status.enum';
import { TruckRepository } from './infrastructure/persistence/truck.repository';

@Injectable()
export class TrucksService {
  constructor(
    private readonly warehouseService: WarehousesService,

    @Inject(forwardRef(() => IoTDevicesService))
    private readonly ioTDeviceService: IoTDevicesService,

    // Dependencies here
    private readonly truckRepository: TruckRepository,
  ) {}

  async create(createTruckDto: CreateTruckDto) {
    // Do not remove comment below.
    // <creating-property />
    let warehouse: Warehouse | null | undefined = undefined;

    if (createTruckDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        createTruckDto.warehouse.id,
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
    } else if (createTruckDto.warehouse === null) {
      warehouse = null;
    }

    let iotDevice: IoTDevice[] | null | undefined = undefined;

    if (createTruckDto.iotDevice) {
      const iotDeviceObjects = await this.ioTDeviceService.findByIds(
        createTruckDto.iotDevice.map((entity) => entity.id),
      );
      if (iotDeviceObjects.length !== createTruckDto.iotDevice.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            iotDevice: 'notExists',
          },
        });
      }
      iotDevice = iotDeviceObjects;
    } else if (createTruckDto.iotDevice === null) {
      iotDevice = null;
    }

    return this.truckRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      warehouse,

      status: TruckStatusEnum.AVAILABLE,

      currentLocation: createTruckDto.currentLocation,

      model: createTruckDto.model,

      licensePhoto: createTruckDto.licensePhoto,

      licensePlate: createTruckDto.licensePlate,

      capacity: createTruckDto.capacity,

      iotDevice,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.truckRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Truck['id']) {
    return this.truckRepository.findById(id);
  }

  findByIds(ids: Truck['id'][]) {
    return this.truckRepository.findByIds(ids);
  }

  async update(
    id: Truck['id'],

    updateTruckDto: UpdateTruckDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let warehouse: Warehouse | null | undefined = undefined;

    if (updateTruckDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        updateTruckDto.warehouse.id,
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
    } else if (updateTruckDto.warehouse === null) {
      warehouse = null;
    }

    let iotDevice: IoTDevice[] | null | undefined = undefined;

    if (updateTruckDto.iotDevice) {
      const iotDeviceObjects = await this.ioTDeviceService.findByIds(
        updateTruckDto.iotDevice.map((entity) => entity.id),
      );
      if (iotDeviceObjects.length !== updateTruckDto.iotDevice.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            iotDevice: 'notExists',
          },
        });
      }
      iotDevice = iotDeviceObjects;
    } else if (updateTruckDto.iotDevice === null) {
      iotDevice = null;
    }

    return this.truckRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      warehouse,

      currentLocation: updateTruckDto.currentLocation,

      model: updateTruckDto.model,

      licensePhoto: updateTruckDto.licensePhoto,

      licensePlate: updateTruckDto.licensePlate,

      capacity: updateTruckDto.capacity,

      iotDevice,
    });
  }

  remove(id: Truck['id']) {
    return this.truckRepository.remove(id);
  }

  async updateStatus(id: Truck['id'], status: TruckStatusEnum) {
    const truck = await this.truckRepository.findById(id);

    if (!truck) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = truck.status;

    // Define allowed status transitions
    const allowedTransitions: Record<string, TruckStatusEnum[]> = {
      available: [
        TruckStatusEnum.UNAVAILABLE,
        TruckStatusEnum.IN_USE,
        TruckStatusEnum.MAINTENANCE,
      ],
      unavailable: [TruckStatusEnum.AVAILABLE],
      inUse: [TruckStatusEnum.AVAILABLE, TruckStatusEnum.UNAVAILABLE],
      maintenance: [TruckStatusEnum.AVAILABLE, TruckStatusEnum.UNAVAILABLE],
    };

    // Validate status transition
    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as TruckStatusEnum,
      )
    ) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          status: `invalidTransitionFrom${currentStatus}To${status}`,
        },
      });
    }

    return this.truckRepository.update(id, {
      status,
      updatedAt: new Date(),
    });
  }
}
