import { IoTDevicesService } from '../io-t-devices/io-t-devices.service';
import { IoTDevice } from '../io-t-devices/domain/io-t-device';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { TruckRepository } from './infrastructure/persistence/truck.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Truck } from './domain/truck';

@Injectable()
export class TrucksService {
  constructor(
    @Inject(forwardRef(() => IoTDevicesService))
    private readonly ioTDeviceService: IoTDevicesService,

    // Dependencies here
    private readonly truckRepository: TruckRepository,
  ) {}

  async create(createTruckDto: CreateTruckDto) {
    // Do not remove comment below.
    // <creating-property />

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
      status: createTruckDto.status,

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
      status: updateTruckDto.status,

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
}
