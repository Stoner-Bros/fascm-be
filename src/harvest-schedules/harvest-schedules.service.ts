import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/domain/supplier';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateHarvestScheduleDto } from './dto/create-harvest-schedule.dto';
import { UpdateHarvestScheduleDto } from './dto/update-harvest-schedule.dto';
import { HarvestScheduleRepository } from './infrastructure/persistence/harvest-schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestSchedule } from './domain/harvest-schedule';
import { HarvestScheduleStatusEnum } from './harvest-schedule-status.enum';
import { HarvestTicketRepository } from 'src/harvest-tickets/infrastructure/persistence/harvest-ticket.repository';
import { HarvestDetailRepository } from 'src/harvest-details/infrastructure/persistence/harvest-detail.repository';
import { InboundBatchesService } from 'src/inbound-batches/inbound-batches.service';

@Injectable()
export class HarvestSchedulesService {
  constructor(
    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly harvestScheduleRepository: HarvestScheduleRepository,
    @Inject(forwardRef(() => HarvestTicketRepository))
    private readonly harvestTicketRepository: HarvestTicketRepository,
    @Inject(forwardRef(() => HarvestDetailRepository))
    private readonly harvestDetailRepository: HarvestDetailRepository,
    private readonly inboundBatchService: InboundBatchesService,
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
    reason?: string,
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

    // Check if approving, create inbound batch base on harvest details
    if (status === HarvestScheduleStatusEnum.APPROVED) {
      const harvestTicket =
        await this.harvestTicketRepository.findByHarvestScheduleId(id);
      const harvestDetails =
        await this.harvestDetailRepository.findByHarvestTicketId(
          harvestTicket.id,
        );

      if (harvestDetails.length > 0) {
        // Each harvest detail will create an inbound batch
        for (const detail of harvestDetails) {
          await this.inboundBatchService.create({
            quantity: detail.quantity,
            unit: detail.unit,
            product: detail.product,
            harvestDetail: detail,
          });
        }
      }
    }

    return this.harvestScheduleRepository.confirm(id, status, reason);
  }

  async cancel(id: HarvestSchedule['id']) {
    const harvestSchedule = await this.harvestScheduleRepository.findById(id);

    if (!harvestSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    if (
      harvestSchedule.status !== HarvestScheduleStatusEnum.PENDING &&
      harvestSchedule.status !== HarvestScheduleStatusEnum.APPROVED &&
      harvestSchedule.status !== HarvestScheduleStatusEnum.REJECTED
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          status: 'cannotCancelScheduleWithCurrentStatus',
        },
      });
    }

    return this.harvestScheduleRepository.update(id, {
      status: HarvestScheduleStatusEnum.CANCELED,
    });
  }

  async complete(id: HarvestSchedule['id']) {
    const harvestSchedule = await this.harvestScheduleRepository.findById(id);

    if (!harvestSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    if (harvestSchedule.status !== HarvestScheduleStatusEnum.APPROVED) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          status: 'canOnlyCompleteApprovedSchedule',
        },
      });
    }

    return this.harvestScheduleRepository.update(id, {
      status: HarvestScheduleStatusEnum.COMPLETED,
    });
  }

  remove(id: HarvestSchedule['id']) {
    return this.harvestScheduleRepository.remove(id);
  }
}
