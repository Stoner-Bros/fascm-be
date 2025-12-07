import { InboundBatch } from '../inbound-batches/domain/inbound-batch';
import { InboundBatchesService } from '../inbound-batches/inbound-batches.service';

import {
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BatchesService } from 'src/batches/batches.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ImportTicket } from './domain/import-ticket';
import { CreateImportTicketDto } from './dto/create-import-ticket.dto';
import { ImportTicketRepository } from './infrastructure/persistence/import-ticket.repository';
import { Product } from 'src/products/domain/product';

@Injectable()
export class ImportTicketsService {
  constructor(
    @Inject(forwardRef(() => InboundBatchesService))
    private readonly inboundBatchService: InboundBatchesService,

    @Inject(forwardRef(() => BatchesService))
    private readonly batchesService: BatchesService,

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

    const importTicket = await this.importTicketRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      unit: 'kg',
      quantity: createImportTicketDto.realityQuantity,
      importDate: new Date(),
      percent:
        ((createImportTicketDto.realityQuantity || 0) /
          (inboundBatch?.quantity || 1)) *
        100,
      expiredAt: createImportTicketDto.expiredAt,
    });

    // there is 3 types of batch: 20kg batch, 10kg batch and <10kg batch, so here we create 20kg batch first.
    // If <20kg create 10kg batch, if <10kg create <10kg batch
    let product: Product | null = null;
    if (inboundBatch) {
      product =
        await this.inboundBatchService.getProductOfInboundBatch(inboundBatch);
    }
    let remainingQuantity = importTicket.quantity || 0;
    while (remainingQuantity >= 20) {
      await this.batchesService.create({
        quantity: 20,
        unit: 'kg',
        importTicket: { id: importTicket.id },
        area: createImportTicketDto.area
          ? { id: createImportTicketDto.area.id }
          : null,
        product: product ? { id: product.id } : null,
      });
      remainingQuantity -= 20;
    }

    while (remainingQuantity >= 10) {
      await this.batchesService.create({
        quantity: 10,
        unit: 'kg',
        importTicket: { id: importTicket.id },
        area: createImportTicketDto.area
          ? { id: createImportTicketDto.area.id }
          : null,
        product: product ? { id: product.id } : null,
      });
      remainingQuantity -= 10;
    }

    if (remainingQuantity > 0) {
      await this.batchesService.create({
        quantity: remainingQuantity,
        unit: 'kg',
        importTicket: { id: importTicket.id },
        area: createImportTicketDto.area
          ? { id: createImportTicketDto.area.id }
          : null,
        product: product ? { id: product.id } : null,
      });
    }

    return importTicket;
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

  // async update(
  //   id: ImportTicket['id'],

  //   updateImportTicketDto: UpdateImportTicketDto,
  // ) {
  //   // Do not remove comment below.
  //   // <updating-property />

  //   let inboundBatch: InboundBatch | null | undefined = undefined;

  //   if (updateImportTicketDto.inboundBatch) {
  //     const inboundBatchObject = await this.inboundBatchService.findById(
  //       updateImportTicketDto.inboundBatch.id,
  //     );
  //     if (!inboundBatchObject) {
  //       throw new UnprocessableEntityException({
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           inboundBatch: 'notExists',
  //         },
  //       });
  //     }
  //     inboundBatch = inboundBatchObject;
  //   } else if (updateImportTicketDto.inboundBatch === null) {
  //     inboundBatch = null;
  //   }

  //   return this.importTicketRepository.update(id, {
  //     // Do not remove comment below.
  //     // <updating-property-payload />
  //     numberOfBatch: (updateImportTicketDto.realityQuantity || 0) / 20,

  //     percent:
  //       ((updateImportTicketDto.realityQuantity || 0) /
  //         (inboundBatch?.quantity || 1)) *
  //       100,

  //     importDate: updateImportTicketDto.importDate,

  //     inboundBatch,
  //   });
  // }

  remove(id: ImportTicket['id']) {
    return this.importTicketRepository.remove(id);
  }
}
