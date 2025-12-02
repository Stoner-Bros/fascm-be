import { IoTDevicesService } from '../io-t-devices/io-t-devices.service';
import { IoTDevice } from '../io-t-devices/domain/io-t-device';

import { WarehousesService } from '../warehouses/warehouses.service';
import { Warehouse } from '../warehouses/domain/warehouse';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreaRepository } from './infrastructure/persistence/area.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Area } from './domain/area';

@Injectable()
export class AreasService {
  constructor(
    @Inject(forwardRef(() => IoTDevicesService))
    private readonly ioTDeviceService: IoTDevicesService,

    private readonly warehouseService: WarehousesService,

    // Dependencies here
    private readonly areaRepository: AreaRepository,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    // Do not remove comment below.
    // <creating-property />
    let iotDevice: IoTDevice[] | null | undefined = undefined;

    if (createAreaDto.iotDevice) {
      const iotDeviceObjects = await this.ioTDeviceService.findByIds(
        createAreaDto.iotDevice.map((entity) => entity.id),
      );
      if (iotDeviceObjects.length !== createAreaDto.iotDevice.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            iotDevice: 'notExists',
          },
        });
      }
      iotDevice = iotDeviceObjects;
    } else if (createAreaDto.iotDevice === null) {
      iotDevice = null;
    }

    let warehouse: Warehouse | null | undefined = undefined;

    if (createAreaDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        createAreaDto.warehouse.id,
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
    } else if (createAreaDto.warehouse === null) {
      warehouse = null;
    }

    return this.areaRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      availableCapacity: createAreaDto.availableCapacity,

      iotDevice,

      description: createAreaDto.description,

      capacity: createAreaDto.capacity,

      location: createAreaDto.location,

      name: createAreaDto.name,

      warehouse,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.areaRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Area['id']) {
    return this.areaRepository.findById(id);
  }

  findByIds(ids: Area['id'][]) {
    return this.areaRepository.findByIds(ids);
  }

  async update(
    id: Area['id'],

    updateAreaDto: UpdateAreaDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let iotDevice: IoTDevice[] | null | undefined = undefined;

    if (updateAreaDto.iotDevice) {
      const iotDeviceObjects = await this.ioTDeviceService.findByIds(
        updateAreaDto.iotDevice.map((entity) => entity.id),
      );
      if (iotDeviceObjects.length !== updateAreaDto.iotDevice.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            iotDevice: 'notExists',
          },
        });
      }
      iotDevice = iotDeviceObjects;
    } else if (updateAreaDto.iotDevice === null) {
      iotDevice = null;
    }

    let warehouse: Warehouse | null | undefined = undefined;

    if (updateAreaDto.warehouse) {
      const warehouseObject = await this.warehouseService.findById(
        updateAreaDto.warehouse.id,
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
    } else if (updateAreaDto.warehouse === null) {
      warehouse = null;
    }

    return this.areaRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      availableCapacity: updateAreaDto.availableCapacity,

      iotDevice,

      description: updateAreaDto.description,

      capacity: updateAreaDto.capacity,

      location: updateAreaDto.location,

      name: updateAreaDto.name,

      warehouse,
    });
  }

  remove(id: Area['id']) {
    return this.areaRepository.remove(id);
  }
}
