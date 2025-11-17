import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/domain/supplier';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateHarvestScheduleDto } from './dto/create-harvest-schedule.dto';
import { UpdateHarvestScheduleDto } from './dto/update-harvest-schedule.dto';
import { HarvestScheduleRepository } from './infrastructure/persistence/harvest-schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestSchedule } from './domain/harvest-schedule';
import { HarvestScheduleStatusEnum } from './harvest-schedule-status.enum';

@Injectable()
export class HarvestSchedulesService {
  constructor(
    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly harvestScheduleRepository: HarvestScheduleRepository,
  ) {}

  async create(createHarvestScheduleDto: CreateHarvestScheduleDto) {
    // Do not remove comment below.
    // <creating-property />

    let supplierId: Supplier | null | undefined = undefined;

    if (createHarvestScheduleDto.supplierId) {
      const supplierIdObject = await this.supplierService.findById(
        createHarvestScheduleDto.supplierId.id,
      );
      if (!supplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierId: 'notExists',
          },
        });
      }
      supplierId = supplierIdObject;
    } else if (createHarvestScheduleDto.supplierId === null) {
      supplierId = null;
    }

    return this.harvestScheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createHarvestScheduleDto.description,

      status: HarvestScheduleStatusEnum.PENDING,

      harvestDate: createHarvestScheduleDto.harvestDate,

      supplierId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.harvestScheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: HarvestSchedule['id']) {
    return this.harvestScheduleRepository.findById(id);
  }

  findByIds(ids: HarvestSchedule['id'][]) {
    return this.harvestScheduleRepository.findByIds(ids);
  }

  async update(
    id: HarvestSchedule['id'],

    updateHarvestScheduleDto: UpdateHarvestScheduleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let supplierId: Supplier | null | undefined = undefined;

    if (updateHarvestScheduleDto.supplierId) {
      const supplierIdObject = await this.supplierService.findById(
        updateHarvestScheduleDto.supplierId.id,
      );
      if (!supplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierId: 'notExists',
          },
        });
      }
      supplierId = supplierIdObject;
    } else if (updateHarvestScheduleDto.supplierId === null) {
      supplierId = null;
    }

    return this.harvestScheduleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateHarvestScheduleDto.description,

      status: HarvestScheduleStatusEnum.PENDING,

      harvestDate: updateHarvestScheduleDto.harvestDate,

      supplierId,
    });
  }

  async confirm(
    id: HarvestSchedule['id'],
    status:
      | HarvestScheduleStatusEnum.APPROVED
      | HarvestScheduleStatusEnum.REJECTED,
  ) {
    const harvestSchedule = await this.harvestScheduleRepository.findById(id);

    if (!harvestSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    if (harvestSchedule.status !== HarvestScheduleStatusEnum.PENDING) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          status: 'cannotConfirmNonPendingSchedule',
        },
      });
    }

    return this.harvestScheduleRepository.update(id, {
      status,
    });
  }

  remove(id: HarvestSchedule['id']) {
    return this.harvestScheduleRepository.remove(id);
  }
}
