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
    const truckObject = await this.truckService.findById(
      createIoTDeviceDto.truck.id,
    );
    if (!truckObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          truck: 'notExists',
        },
      });
    }
    const truck = truckObject;

    const areaObject = await this.areaService.findById(
      createIoTDeviceDto.area.id,
    );
    if (!areaObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          area: 'notExists',
        },
      });
    }
    const area = areaObject;

    return this.ioTDeviceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      truck,

      area,

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
    let truck: Truck | undefined = undefined;

    if (updateIoTDeviceDto.truck) {
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
    }

    let area: Area | undefined = undefined;

    if (updateIoTDeviceDto.area) {
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
}
