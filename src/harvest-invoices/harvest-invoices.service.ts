import { HarvestPhase } from '../harvest-phases/domain/harvest-phase';
import { HarvestPhasesService } from '../harvest-phases/harvest-phases.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestInvoice } from './domain/harvest-invoice';
import { CreateHarvestInvoiceDto } from './dto/create-harvest-invoice.dto';
import { UpdateHarvestInvoiceDto } from './dto/update-harvest-invoice.dto';
import { HarvestInvoiceRepository } from './infrastructure/persistence/harvest-invoice.repository';

@Injectable()
export class HarvestInvoicesService {
  constructor(
    @Inject(forwardRef(() => HarvestPhasesService))
    private readonly harvestPhaseService: HarvestPhasesService,

    // Dependencies here
    private readonly harvestInvoiceRepository: HarvestInvoiceRepository,
  ) {}

  async create(createHarvestInvoiceDto: CreateHarvestInvoiceDto) {
    // Do not remove comment below.
    // <creating-property />

    let harvestPhase: HarvestPhase | null | undefined = undefined;

    if (createHarvestInvoiceDto.harvestPhase) {
      const harvestPhaseObject = await this.harvestPhaseService.findById(
        createHarvestInvoiceDto.harvestPhase.id,
      );
      if (!harvestPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestPhase: 'notExists',
          },
        });
      }
      harvestPhase = harvestPhaseObject;
    } else if (createHarvestInvoiceDto.harvestPhase === null) {
      harvestPhase = null;
    }

    return this.harvestInvoiceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      totalPayment: createHarvestInvoiceDto.totalPayment,

      totalAmount: createHarvestInvoiceDto.totalAmount,

      quantity: createHarvestInvoiceDto.quantity,

      unit: createHarvestInvoiceDto.unit,

      vatAmount: createHarvestInvoiceDto.vatAmount,

      taxRate: createHarvestInvoiceDto.taxRate,

      accountNumber: createHarvestInvoiceDto.accountNumber,

      paymentStatus: createHarvestInvoiceDto.paymentStatus,

      paymentMethod: createHarvestInvoiceDto.paymentMethod,

      invoiceNumber: createHarvestInvoiceDto.invoiceNumber,

      invoiceUrl: createHarvestInvoiceDto.invoiceUrl,

      harvestPhase,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.harvestInvoiceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: HarvestInvoice['id']) {
    return this.harvestInvoiceRepository.findById(id);
  }

  findByIds(ids: HarvestInvoice['id'][]) {
    return this.harvestInvoiceRepository.findByIds(ids);
  }

  async update(
    id: HarvestInvoice['id'],

    updateHarvestInvoiceDto: UpdateHarvestInvoiceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let harvestPhase: HarvestPhase | null | undefined = undefined;

    if (updateHarvestInvoiceDto.harvestPhase) {
      const harvestPhaseObject = await this.harvestPhaseService.findById(
        updateHarvestInvoiceDto.harvestPhase.id,
      );
      if (!harvestPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestPhase: 'notExists',
          },
        });
      }
      harvestPhase = harvestPhaseObject;
    } else if (updateHarvestInvoiceDto.harvestPhase === null) {
      harvestPhase = null;
    }

    return this.harvestInvoiceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      totalPayment: updateHarvestInvoiceDto.totalPayment,

      totalAmount: updateHarvestInvoiceDto.totalAmount,

      quantity: updateHarvestInvoiceDto.quantity,

      unit: updateHarvestInvoiceDto.unit,

      vatAmount: updateHarvestInvoiceDto.vatAmount,

      taxRate: updateHarvestInvoiceDto.taxRate,

      accountNumber: updateHarvestInvoiceDto.accountNumber,

      paymentStatus: updateHarvestInvoiceDto.paymentStatus,

      paymentMethod: updateHarvestInvoiceDto.paymentMethod,

      invoiceNumber: updateHarvestInvoiceDto.invoiceNumber,

      invoiceUrl: updateHarvestInvoiceDto.invoiceUrl,

      harvestPhase,
    });
  }

  remove(id: HarvestInvoice['id']) {
    return this.harvestInvoiceRepository.remove(id);
  }
}
