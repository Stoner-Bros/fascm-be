import { Product } from '../products/domain/product';

import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HarvestInvoiceDetail } from 'src/harvest-invoice-details/domain/harvest-invoice-detail';
import { HarvestInvoiceDetailsService } from 'src/harvest-invoice-details/harvest-invoice-details.service';
import { ImportTicket } from 'src/import-tickets/domain/import-ticket';
import { ImportTicketsService } from 'src/import-tickets/import-tickets.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { InboundBatch } from './domain/inbound-batch';
import { CreateInboundBatchDto } from './dto/create-inbound-batch.dto';
import { UpdateInboundBatchDto } from './dto/update-inbound-batch.dto';
import { InboundBatchRepository } from './infrastructure/persistence/inbound-batch.repository';

@Injectable()
export class InboundBatchesService {
  constructor(
    private readonly importTicketService: ImportTicketsService,

    private readonly harvestInvoiceDetailService: HarvestInvoiceDetailsService,

    // Dependencies here
    private readonly inboundBatchRepository: InboundBatchRepository,
  ) {}

  async create(createInboundBatchDto: CreateInboundBatchDto) {
    // Do not remove comment below.
    // <creating-property />

    let importTicket: ImportTicket | null | undefined = undefined;

    if (createInboundBatchDto.importTicket) {
      const importTicketObject = await this.importTicketService.findById(
        createInboundBatchDto.importTicket.id,
      );
      if (!importTicketObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            importTicket: 'notExists',
          },
        });
      }
      importTicket = importTicketObject;
    } else if (createInboundBatchDto.importTicket === null) {
      importTicket = null;
    }

    let harvestInvoiceDetail: HarvestInvoiceDetail | null | undefined =
      undefined;

    if (createInboundBatchDto.harvestInvoiceDetail) {
      const harvestInvoiceDetailObject =
        await this.harvestInvoiceDetailService.findById(
          createInboundBatchDto.harvestInvoiceDetail.id,
        );
      if (!harvestInvoiceDetailObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestInvoiceDetail: 'notExists',
          },
        });
      }
      harvestInvoiceDetail = harvestInvoiceDetailObject;
    } else if (createInboundBatchDto.harvestInvoiceDetail === null) {
      harvestInvoiceDetail = null;
    }

    return this.inboundBatchRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      quantity: createInboundBatchDto.quantity,

      unit: createInboundBatchDto.unit,

      batchCode: createInboundBatchDto.batchCode,

      importTicket,

      harvestInvoiceDetail,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.inboundBatchRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: InboundBatch['id']) {
    return this.inboundBatchRepository.findById(id);
  }

  findByIds(ids: InboundBatch['id'][]) {
    return this.inboundBatchRepository.findByIds(ids);
  }

  async update(
    id: InboundBatch['id'],

    updateInboundBatchDto: UpdateInboundBatchDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let importTicket: ImportTicket | null | undefined = undefined;

    if (updateInboundBatchDto.importTicket) {
      const importTicketObject = await this.importTicketService.findById(
        updateInboundBatchDto.importTicket.id,
      );
      if (!importTicketObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            importTicket: 'notExists',
          },
        });
      }
      importTicket = importTicketObject;
    } else if (updateInboundBatchDto.importTicket === null) {
      importTicket = null;
    }

    let harvestInvoiceDetail: HarvestInvoiceDetail | null | undefined =
      undefined;
    if (updateInboundBatchDto.harvestInvoiceDetail) {
      const harvestInvoiceDetailObject =
        await this.harvestInvoiceDetailService.findById(
          updateInboundBatchDto.harvestInvoiceDetail.id,
        );
      if (!harvestInvoiceDetailObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestInvoiceDetail: 'notExists',
          },
        });
      }
      harvestInvoiceDetail = harvestInvoiceDetailObject;
    } else if (updateInboundBatchDto.harvestInvoiceDetail === null) {
      harvestInvoiceDetail = null;
    }

    return this.inboundBatchRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      quantity: updateInboundBatchDto.quantity,

      unit: updateInboundBatchDto.unit,

      batchCode: updateInboundBatchDto.batchCode,

      importTicket,

      harvestInvoiceDetail,
    });
  }

  remove(id: InboundBatch['id']) {
    return this.inboundBatchRepository.remove(id);
  }

  async getProductOfInboundBatch(
    inboundBatch: InboundBatch,
  ): Promise<Product | null> {
    if (!inboundBatch || !inboundBatch.importTicket) {
      return null;
    }
    return await this.inboundBatchRepository.getProductOfInboundBatch(
      inboundBatch,
    );
  }
}
