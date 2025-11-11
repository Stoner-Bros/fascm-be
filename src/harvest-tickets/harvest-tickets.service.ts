import { HarvestSchedulesService } from '../harvest-schedules/harvest-schedules.service';
import { HarvestSchedule } from '../harvest-schedules/domain/harvest-schedule';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateHarvestTicketDto } from './dto/create-harvest-ticket.dto';
import { UpdateHarvestTicketDto } from './dto/update-harvest-ticket.dto';
import { HarvestTicketRepository } from './infrastructure/persistence/harvest-ticket.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestTicket } from './domain/harvest-ticket';

@Injectable()
export class HarvestTicketsService {
  constructor(
    private readonly harvestScheduleService: HarvestSchedulesService,

    // Dependencies here
    private readonly harvestTicketRepository: HarvestTicketRepository,
  ) {}

  async create(createHarvestTicketDto: CreateHarvestTicketDto) {
    // Do not remove comment below.
    // <creating-property />

    let harvestScheduleId: HarvestSchedule | null | undefined = undefined;

    if (createHarvestTicketDto.harvestScheduleId) {
      const harvestScheduleIdObject =
        await this.harvestScheduleService.findById(
          createHarvestTicketDto.harvestScheduleId.id,
        );
      if (!harvestScheduleIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestScheduleId: 'notExists',
          },
        });
      }
      harvestScheduleId = harvestScheduleIdObject;
    } else if (createHarvestTicketDto.harvestScheduleId === null) {
      harvestScheduleId = null;
    }

    return this.harvestTicketRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      date: createHarvestTicketDto.date,

      quantity: createHarvestTicketDto.quantity,

      unit: createHarvestTicketDto.unit,

      totalPayment: createHarvestTicketDto.totalPayment,

      vatAmount: createHarvestTicketDto.vatAmount,

      totalAmount: createHarvestTicketDto.totalAmount,

      taxRate: createHarvestTicketDto.taxRate,

      accountNumber: createHarvestTicketDto.accountNumber,

      paymentMethod: createHarvestTicketDto.paymentMethod,

      ticketNumber: createHarvestTicketDto.ticketNumber,

      ticketUrl: createHarvestTicketDto.ticketUrl,

      harvestScheduleId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.harvestTicketRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: HarvestTicket['id']) {
    return this.harvestTicketRepository.findById(id);
  }

  findByIds(ids: HarvestTicket['id'][]) {
    return this.harvestTicketRepository.findByIds(ids);
  }

  async update(
    id: HarvestTicket['id'],

    updateHarvestTicketDto: UpdateHarvestTicketDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let harvestScheduleId: HarvestSchedule | null | undefined = undefined;

    if (updateHarvestTicketDto.harvestScheduleId) {
      const harvestScheduleIdObject =
        await this.harvestScheduleService.findById(
          updateHarvestTicketDto.harvestScheduleId.id,
        );
      if (!harvestScheduleIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestScheduleId: 'notExists',
          },
        });
      }
      harvestScheduleId = harvestScheduleIdObject;
    } else if (updateHarvestTicketDto.harvestScheduleId === null) {
      harvestScheduleId = null;
    }

    return this.harvestTicketRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      date: updateHarvestTicketDto.date,

      quantity: updateHarvestTicketDto.quantity,

      unit: updateHarvestTicketDto.unit,

      totalPayment: updateHarvestTicketDto.totalPayment,

      vatAmount: updateHarvestTicketDto.vatAmount,

      totalAmount: updateHarvestTicketDto.totalAmount,

      taxRate: updateHarvestTicketDto.taxRate,

      accountNumber: updateHarvestTicketDto.accountNumber,

      paymentMethod: updateHarvestTicketDto.paymentMethod,

      ticketNumber: updateHarvestTicketDto.ticketNumber,

      ticketUrl: updateHarvestTicketDto.ticketUrl,

      harvestScheduleId,
    });
  }

  remove(id: HarvestTicket['id']) {
    return this.harvestTicketRepository.remove(id);
  }
}
