import { HarvestSchedulesService } from '../harvest-schedules/harvest-schedules.service';
import { HarvestSchedule } from '../harvest-schedules/domain/harvest-schedule';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateHarvestPhaseDto } from './dto/create-harvest-phase.dto';
import { UpdateHarvestPhaseDto } from './dto/update-harvest-phase.dto';
import { HarvestPhaseRepository } from './infrastructure/persistence/harvest-phase.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestPhase } from './domain/harvest-phase';

@Injectable()
export class HarvestPhasesService {
  constructor(
    @Inject(forwardRef(() => HarvestSchedulesService))
    private readonly harvestScheduleService: HarvestSchedulesService,

    // Dependencies here
    private readonly harvestPhaseRepository: HarvestPhaseRepository,
  ) {}

  async create(createHarvestPhaseDto: CreateHarvestPhaseDto) {
    // Do not remove comment below.
    // <creating-property />

    let harvestSchedule: HarvestSchedule | null | undefined = undefined;

    if (createHarvestPhaseDto.harvestSchedule) {
      const harvestScheduleObject = await this.harvestScheduleService.findById(
        createHarvestPhaseDto.harvestSchedule.id,
      );
      if (!harvestScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestSchedule: 'notExists',
          },
        });
      }
      harvestSchedule = harvestScheduleObject;
    } else if (createHarvestPhaseDto.harvestSchedule === null) {
      harvestSchedule = null;
    }

    return this.harvestPhaseRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createHarvestPhaseDto.description,

      status: createHarvestPhaseDto.status,

      phaseNumber: createHarvestPhaseDto.phaseNumber,

      harvestSchedule,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.harvestPhaseRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: HarvestPhase['id']) {
    return this.harvestPhaseRepository.findById(id);
  }

  findByIds(ids: HarvestPhase['id'][]) {
    return this.harvestPhaseRepository.findByIds(ids);
  }

  async update(
    id: HarvestPhase['id'],

    updateHarvestPhaseDto: UpdateHarvestPhaseDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let harvestSchedule: HarvestSchedule | null | undefined = undefined;

    if (updateHarvestPhaseDto.harvestSchedule) {
      const harvestScheduleObject = await this.harvestScheduleService.findById(
        updateHarvestPhaseDto.harvestSchedule.id,
      );
      if (!harvestScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestSchedule: 'notExists',
          },
        });
      }
      harvestSchedule = harvestScheduleObject;
    } else if (updateHarvestPhaseDto.harvestSchedule === null) {
      harvestSchedule = null;
    }

    return this.harvestPhaseRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateHarvestPhaseDto.description,

      status: updateHarvestPhaseDto.status,

      phaseNumber: updateHarvestPhaseDto.phaseNumber,

      harvestSchedule,
    });
  }

  remove(id: HarvestPhase['id']) {
    return this.harvestPhaseRepository.remove(id);
  }
}
