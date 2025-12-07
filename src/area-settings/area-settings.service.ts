import { AreasService } from '../areas/areas.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAreaSettingDto } from './dto/create-area-setting.dto';
import { UpdateAreaSettingDto } from './dto/update-area-setting.dto';
import { AreaSettingRepository } from './infrastructure/persistence/area-setting.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AreaSetting } from './domain/area-setting';
import { Area } from '../areas/domain/area';

@Injectable()
export class AreaSettingsService {
  constructor(
    private readonly areaService: AreasService,

    // Dependencies here
    private readonly areaSettingRepository: AreaSettingRepository,
  ) {}

  async create(createAreaSettingDto: CreateAreaSettingDto) {
    // Do not remove comment below.
    // <creating-property />

    let area: Area | null | undefined = undefined;

    if (createAreaSettingDto.area) {
      const areaObject = await this.areaService.findById(
        createAreaSettingDto.area.id,
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
    } else if (createAreaSettingDto.area === null) {
      area = null;
    }

    return this.areaSettingRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      minStock: createAreaSettingDto.minStock,

      minHumidity: createAreaSettingDto.minHumidity,
      maxHumidity: createAreaSettingDto.maxHumidity,
      minTemperature: createAreaSettingDto.minTemperature,
      maxTemperature: createAreaSettingDto.maxTemperature,
      area,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.areaSettingRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: AreaSetting['id']) {
    return this.areaSettingRepository.findById(id);
  }

  findByIds(ids: AreaSetting['id'][]) {
    return this.areaSettingRepository.findByIds(ids);
  }

  async update(
    id: AreaSetting['id'],

    updateAreaSettingDto: UpdateAreaSettingDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let area: Area | null | undefined = undefined;

    if (updateAreaSettingDto.area) {
      const areaObject = await this.areaService.findById(
        updateAreaSettingDto.area.id,
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
    } else if (updateAreaSettingDto.area === null) {
      area = null;
    }

    return this.areaSettingRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      minStock: updateAreaSettingDto.minStock,

      minHumidity: updateAreaSettingDto.minHumidity,
      maxHumidity: updateAreaSettingDto.maxHumidity,
      minTemperature: updateAreaSettingDto.minTemperature,
      maxTemperature: updateAreaSettingDto.maxTemperature,

      area,
    });
  }

  remove(id: AreaSetting['id']) {
    return this.areaSettingRepository.remove(id);
  }

  findByAreaId(areaId: string) {
    return this.areaSettingRepository.findByAreaId(areaId);
  }
}
