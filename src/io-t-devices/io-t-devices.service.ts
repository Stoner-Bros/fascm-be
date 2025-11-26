import { TrucksService } from '../trucks/trucks.service';
import { Truck } from '../trucks/domain/truck';

import { AreasService } from '../areas/areas.service';
import { Area } from '../areas/domain/area';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateIoTDeviceDto } from './dto/create-io-t-device.dto';
import { UpdateIoTDeviceDto } from './dto/update-io-t-device.dto';
import { IoTDeviceRepository } from './infrastructure/persistence/io-t-device.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { IoTDevice } from './domain/io-t-device';

@Injectable()
export class IoTDevicesService {
  constructor(
    @Inject(forwardRef(() => TrucksService))
    private readonly truckService: TrucksService,

    @Inject(forwardRef(() => AreasService))
    private readonly areaService: AreasService,

    // Dependencies here
    private readonly ioTDeviceRepository: IoTDeviceRepository,
  ) {}

  async create(createIoTDeviceDto: CreateIoTDeviceDto) {
    // Do not remove comment below.
    // <creating-property />

    // Validate that either truck or area is provided, but not both or neither
    const hasTruck = createIoTDeviceDto.truck?.id;
    const hasArea = createIoTDeviceDto.area?.id;

    if (!hasTruck && !hasArea) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          device: 'mustHaveEitherTruckOrArea',
        },
      });
    }

    if (hasTruck && hasArea) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          device: 'cannotHaveBothTruckAndArea',
        },
      });
    }

    let truck: Truck | undefined = undefined;
    if (hasTruck) {
      const truckObject = await this.truckService.findById(
        createIoTDeviceDto.truck!.id,
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
    }

    let area: Area | undefined = undefined;
    if (hasArea) {
      const areaObject = await this.areaService.findById(
        createIoTDeviceDto.area!.id,
      );
      if (!areaObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            area: 'notExists',
          },
        });
      }
      area = areaObject;
    }

    return this.ioTDeviceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      truck: truck ?? null,

      area: area ?? null,

      status: createIoTDeviceDto.status,

      data: createIoTDeviceDto.data,

      lastDataTime: createIoTDeviceDto.lastDataTime,

      type: createIoTDeviceDto.type,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.ioTDeviceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: IoTDevice['id']) {
    return this.ioTDeviceRepository.findById(id);
  }

  findByIds(ids: IoTDevice['id'][]) {
    return this.ioTDeviceRepository.findByIds(ids);
  }

  async update(
    id: IoTDevice['id'],

    updateIoTDeviceDto: UpdateIoTDeviceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    // Validate that if both truck and area are provided, they can't both have values
    const hasTruck = updateIoTDeviceDto.truck?.id;
    const hasArea = updateIoTDeviceDto.area?.id;

    if (hasTruck && hasArea) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          device: 'cannotHaveBothTruckAndArea',
        },
      });
    }

    let truck: Truck | null | undefined = undefined;

    if (updateIoTDeviceDto.truck !== undefined) {
      if (updateIoTDeviceDto.truck?.id) {
        const truckObject = await this.truckService.findById(
          updateIoTDeviceDto.truck.id,
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
      } else {
        truck = null;
      }
    }

    let area: Area | null | undefined = undefined;

    if (updateIoTDeviceDto.area !== undefined) {
      if (updateIoTDeviceDto.area?.id) {
        const areaObject = await this.areaService.findById(
          updateIoTDeviceDto.area.id,
        );
        if (!areaObject) {
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              area: 'notExists',
            },
          });
        }
        area = areaObject;
      } else {
        area = null;
      }
    }

    return this.ioTDeviceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      truck,

      area,

      status: updateIoTDeviceDto.status,

      data: updateIoTDeviceDto.data,

      lastDataTime: updateIoTDeviceDto.lastDataTime,

      type: updateIoTDeviceDto.type,
    });
  }

  remove(id: IoTDevice['id']) {
    return this.ioTDeviceRepository.remove(id);
  }

  async updateDeviceData(
    deviceId: string,
    temperature: number,
    humidity: number,
  ) {
    const device = await this.ioTDeviceRepository.findById(deviceId);

    if (!device) {
      return;
    }

    // Tạo JSON string với temperature và humidity
    const data = JSON.stringify({
      temperature,
      humidity,
    });

    // Cập nhật device
    return this.ioTDeviceRepository.update(deviceId, {
      data,
      lastDataTime: new Date(),
      status: 'active',
    });
  }

  async setDeviceOffline(deviceId: string) {
    const device = await this.ioTDeviceRepository.findById(deviceId);

    if (!device) {
      return;
    }

    return this.ioTDeviceRepository.update(deviceId, {
      status: 'inactive',
    });
  }
}
