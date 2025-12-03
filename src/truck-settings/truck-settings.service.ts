import { TrucksService } from '../trucks/trucks.service';
import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTruckSettingDto } from './dto/create-truck-setting.dto';
import { UpdateTruckSettingDto } from './dto/update-truck-setting.dto';
import { TruckSettingRepository } from './infrastructure/persistence/truck-setting.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { TruckSetting } from './domain/truck-setting';
import { Truck } from '../trucks/domain/truck';

@Injectable()
export class TruckSettingsService {
  constructor(
    private readonly truckService: TrucksService,
    private readonly truckSettingRepository: TruckSettingRepository,
  ) {}

  async create(createTruckSettingDto: CreateTruckSettingDto) {
    // Do not remove comment below.
    // <creating-property />

    let truck: Truck | null | undefined = undefined;

    if (createTruckSettingDto.truck) {
      const truckObject = await this.truckService.findById(
        createTruckSettingDto.truck.id,
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
    } else if (createTruckSettingDto.truck === null) {
      truck = null;
    }

    return this.truckSettingRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      minHumidity: createTruckSettingDto.minHumidity,
      maxHumidity: createTruckSettingDto.maxHumidity,
      minTemperature: createTruckSettingDto.minTemperature,
      maxTemperature: createTruckSettingDto.maxTemperature,
      truck,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.truckSettingRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: TruckSetting['id']) {
    return this.truckSettingRepository.findById(id);
  }

  findByIds(ids: TruckSetting['id'][]) {
    return this.truckSettingRepository.findByIds(ids);
  }

  async update(
    id: TruckSetting['id'],

    updateTruckSettingDto: UpdateTruckSettingDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let truck: Truck | null | undefined = undefined;

    if (updateTruckSettingDto.truck) {
      const truckObject = await this.truckService.findById(
        updateTruckSettingDto.truck.id,
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
    } else if (updateTruckSettingDto.truck === null) {
      truck = null;
    }

    return this.truckSettingRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      minHumidity: updateTruckSettingDto.minHumidity,
      maxHumidity: updateTruckSettingDto.maxHumidity,
      minTemperature: updateTruckSettingDto.minTemperature,
      maxTemperature: updateTruckSettingDto.maxTemperature,

      truck,
    });
  }

  remove(id: TruckSetting['id']) {
    return this.truckSettingRepository.remove(id);
  }

  findByTruckId(truckId: string) {
    return this.truckSettingRepository.findByTruckId(truckId);
  }
}
