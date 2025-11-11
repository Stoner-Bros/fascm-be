import { InboundBatchesService } from '../inbound-batches/inbound-batches.service';
import { InboundBatch } from '../inbound-batches/domain/inbound-batch';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateImportTicketDto } from './dto/create-import-ticket.dto';
import { UpdateImportTicketDto } from './dto/update-import-ticket.dto';
import { ImportTicketRepository } from './infrastructure/persistence/import-ticket.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ImportTicket } from './domain/import-ticket';

@Injectable()
export class ImportTicketsService {
  constructor(
    private readonly inboundBatchService: InboundBatchesService,

    // Dependencies here
    private readonly importTicketRepository: ImportTicketRepository,
  ) {}

  async create(createImportTicketDto: CreateImportTicketDto) {
    // Do not remove comment below.
    // <creating-property />

    let inboundBatch: InboundBatch | null | undefined = undefined;

    if (createImportTicketDto.inboundBatch) {
      const inboundBatchObject = await this.inboundBatchService.findById(
        createImportTicketDto.inboundBatch.id,
      );
      if (!inboundBatchObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            inboundBatch: 'notExists',
          },
        });
      }
      inboundBatch = inboundBatchObject;
    } else if (createImportTicketDto.inboundBatch === null) {
      inboundBatch = null;
    }

    return this.importTicketRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      numberOfBatch: createImportTicketDto.numberOfBatch,

      percent: createImportTicketDto.percent,

      importDate: createImportTicketDto.importDate,

      inboundBatch,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.importTicketRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ImportTicket['id']) {
    return this.importTicketRepository.findById(id);
  }

  findByIds(ids: ImportTicket['id'][]) {
    return this.importTicketRepository.findByIds(ids);
  }

  async update(
    id: ImportTicket['id'],

    updateImportTicketDto: UpdateImportTicketDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let inboundBatch: InboundBatch | null | undefined = undefined;

    if (updateImportTicketDto.inboundBatch) {
      const inboundBatchObject = await this.inboundBatchService.findById(
        updateImportTicketDto.inboundBatch.id,
      );
      if (!inboundBatchObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            inboundBatch: 'notExists',
          },
        });
      }
      inboundBatch = inboundBatchObject;
    } else if (updateImportTicketDto.inboundBatch === null) {
      inboundBatch = null;
    }

    return this.importTicketRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      numberOfBatch: updateImportTicketDto.numberOfBatch,

      percent: updateImportTicketDto.percent,

      importDate: updateImportTicketDto.importDate,

      inboundBatch,
    });
  }

  remove(id: ImportTicket['id']) {
    return this.importTicketRepository.remove(id);
  }
}
