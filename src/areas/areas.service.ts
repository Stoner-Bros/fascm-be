import { IoTDevice } from '../io-t-devices/domain/io-t-device';
import { IoTDevicesService } from '../io-t-devices/io-t-devices.service';

import { Warehouse } from '../warehouses/domain/warehouse';
import { WarehousesService } from '../warehouses/warehouses.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { ExportTicketsService } from 'src/export-tickets/export-tickets.service';
import { ImportTicketsService } from 'src/import-tickets/import-tickets.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Area } from './domain/area';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreaRepository } from './infrastructure/persistence/area.repository';

@Injectable()
export class AreasService {
  constructor(
    @Inject(forwardRef(() => IoTDevicesService))
    private readonly ioTDeviceService: IoTDevicesService,

    @Inject(forwardRef(() => ImportTicketsService))
    private readonly importTicketsService: ImportTicketsService,

    @Inject(forwardRef(() => ExportTicketsService))
    private readonly exportTicketsService: ExportTicketsService,

    @Inject(forwardRef(() => WarehousesService))
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
      unit: createAreaDto.unit,

      quantity: createAreaDto.quantity,

      status: createAreaDto.status,
      iotDevice,

      description: createAreaDto.description,

      location: createAreaDto.location,

      name: createAreaDto.name,

      warehouse,
    });
  }

  findAllWithPagination({
    paginationOptions,
    warehouseId,
  }: {
    paginationOptions: IPaginationOptions;
    warehouseId?: string;
  }) {
    return this.areaRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      warehouseId,
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
      unit: updateAreaDto.unit,

      quantity: updateAreaDto.quantity,

      status: updateAreaDto.status,

      iotDevice,

      description: updateAreaDto.description,

      location: updateAreaDto.location,

      name: updateAreaDto.name,

      warehouse,
    });
  }

  remove(id: Area['id']) {
    return this.areaRepository.remove(id);
  }

  async getActivityLogs(areaId: Area['id']) {
    const its = await this.importTicketsService.findByAreaWithPagination({
      areaId,
      paginationOptions: {
        page: 1,
        limit: 10,
      },
    });
    const ets = await this.exportTicketsService.findByAreaWithPagination({
      areaId,
      paginationOptions: {
        page: 1,
        limit: 10,
      },
    });

    return {
      importTickets: its,
      exportTickets: ets,
    };
  }
}
