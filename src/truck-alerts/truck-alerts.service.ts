import { TrucksService } from '../trucks/trucks.service';
import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTruckAlertDto } from './dto/create-truck-alert.dto';
import { UpdateTruckAlertDto } from './dto/update-truck-alert.dto';
import { TruckAlertRepository } from './infrastructure/persistence/truck-alert.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { TruckAlert } from './domain/truck-alert';
import { Truck } from '../trucks/domain/truck';

@Injectable()
export class TruckAlertsService {
  constructor(
    private readonly truckService: TrucksService,
    private readonly truckAlertRepository: TruckAlertRepository,
  ) {}

  async create(createTruckAlertDto: CreateTruckAlertDto) {
    // Do not remove comment below.
    // <creating-property />

    let truck: Truck | null | undefined = undefined;

    if (createTruckAlertDto.truck) {
      const truckObject = await this.truckService.findById(
        createTruckAlertDto.truck.id,
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
    } else if (createTruckAlertDto.truck === null) {
      truck = null;
    }

    return this.truckAlertRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status: createTruckAlertDto.status,

      message: createTruckAlertDto.message,

      alertType: createTruckAlertDto.alertType,

      truck,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.truckAlertRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: TruckAlert['id']) {
    return this.truckAlertRepository.findById(id);
  }

  findByIds(ids: TruckAlert['id'][]) {
    return this.truckAlertRepository.findByIds(ids);
  }

  async update(
    id: TruckAlert['id'],

    updateTruckAlertDto: UpdateTruckAlertDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let truck: Truck | null | undefined = undefined;

    if (updateTruckAlertDto.truck) {
      const truckObject = await this.truckService.findById(
        updateTruckAlertDto.truck.id,
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
    } else if (updateTruckAlertDto.truck === null) {
      truck = null;
    }

    return this.truckAlertRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      status: updateTruckAlertDto.status,

      message: updateTruckAlertDto.message,

      alertType: updateTruckAlertDto.alertType,

      truck,
    });
  }

  remove(id: TruckAlert['id']) {
    return this.truckAlertRepository.remove(id);
  }

  findActiveAlertByTruckId(truckId: string) {
    return this.truckAlertRepository.findActiveAlertByTruckId(truckId);
  }
}
