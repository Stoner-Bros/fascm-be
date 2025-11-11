import { AreasService } from '../areas/areas.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAreaAlertDto } from './dto/create-area-alert.dto';
import { UpdateAreaAlertDto } from './dto/update-area-alert.dto';
import { AreaAlertRepository } from './infrastructure/persistence/area-alert.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AreaAlert } from './domain/area-alert';
import { Area } from '../areas/domain/area';

@Injectable()
export class AreaAlertsService {
  constructor(
    private readonly areaService: AreasService,

    // Dependencies here
    private readonly areaAlertRepository: AreaAlertRepository,
  ) {}

  async create(createAreaAlertDto: CreateAreaAlertDto) {
    // Do not remove comment below.
    // <creating-property />

    let area: Area | null | undefined = undefined;

    if (createAreaAlertDto.area) {
      const areaObject = await this.areaService.findById(
        createAreaAlertDto.area.id,
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
    } else if (createAreaAlertDto.area === null) {
      area = null;
    }

    return this.areaAlertRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status: createAreaAlertDto.status,

      message: createAreaAlertDto.message,

      alertType: createAreaAlertDto.alertType,

      area,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.areaAlertRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: AreaAlert['id']) {
    return this.areaAlertRepository.findById(id);
  }

  findByIds(ids: AreaAlert['id'][]) {
    return this.areaAlertRepository.findByIds(ids);
  }

  async update(
    id: AreaAlert['id'],

    updateAreaAlertDto: UpdateAreaAlertDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let area: Area | null | undefined = undefined;

    if (updateAreaAlertDto.area) {
      const areaObject = await this.areaService.findById(
        updateAreaAlertDto.area.id,
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
    } else if (updateAreaAlertDto.area === null) {
      area = null;
    }

    return this.areaAlertRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      status: updateAreaAlertDto.status,

      message: updateAreaAlertDto.message,

      alertType: updateAreaAlertDto.alertType,

      area,
    });
  }

  remove(id: AreaAlert['id']) {
    return this.areaAlertRepository.remove(id);
  }
}
