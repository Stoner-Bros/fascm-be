import { InboundBatchesService } from '../inbound-batches/inbound-batches.service';

import {
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AreasService } from 'src/areas/areas.service';
import { BatchesService } from 'src/batches/batches.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ImportTicket } from './domain/import-ticket';
import { CreateImportTicketDto } from './dto/create-import-ticket.dto';
import { ImportTicketRepository } from './infrastructure/persistence/import-ticket.repository';

@Injectable()
export class ImportTicketsService {
  constructor(
    @Inject(forwardRef(() => InboundBatchesService))
    private readonly inboundBatchService: InboundBatchesService,

    @Inject(forwardRef(() => BatchesService))
    private readonly batchesService: BatchesService,

    @Inject(forwardRef(() => AreasService))
    private readonly areasService: AreasService,

    // Dependencies here
    private readonly importTicketRepository: ImportTicketRepository,
  ) {}

  async create(createImportTicketDto: CreateImportTicketDto) {
    // Do not remove comment below.
    // <creating-property />

    const totalImportedQuantity =
      (createImportTicketDto.numberOfBigBatch || 0) * 20 +
      (createImportTicketDto.numberOfSmallBatch || 0) * 10;

    if (totalImportedQuantity > createImportTicketDto.realityQuantity) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          numberOfBigBatch: 'exceedsRealityQuantity',
          numberOfSmallBatch: 'exceedsRealityQuantity',
          message: `Total quantity ${totalImportedQuantity} from batches exceeds reality quantity ${createImportTicketDto.realityQuantity}`,
        },
      });
    }

    const inboundBatch = await this.inboundBatchService.findById(
      createImportTicketDto.inboundBatch.id,
    );
    if (!inboundBatch) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          inboundBatch: 'notExists',
        },
      });
    }

    if (inboundBatch.quantity! < createImportTicketDto.realityQuantity!) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          importTicket: 'quantityExceedsInboundBatchQuantity',
        },
      });
    }

    if (inboundBatch.importTicket) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          inboundBatch: 'alreadyHasImportTicket',
        },
      });
    }

    const area = await this.areasService.findById(
      createImportTicketDto.area ? createImportTicketDto.area.id : '',
    );

    if (!area) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          area: 'notExists',
        },
      });
    }

    const importTicket = await this.importTicketRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      unit: 'kg',
      quantity: createImportTicketDto.realityQuantity,
      importDate: new Date(),
      percent: Math.floor(
        ((createImportTicketDto.realityQuantity || 0) /
          (inboundBatch?.quantity || 1)) *
          100,
      ),
      expiredAt: createImportTicketDto.expiredAt,
    });

    inboundBatch.importTicket = importTicket;
    await this.inboundBatchService.update(inboundBatch.id, inboundBatch);

    // there is 3 types of batch: 20kg batch, 10kg batch and <10kg batch, so here we create 20kg batch first.
    // If <20kg create 10kg batch, if <10kg create <10kg batch
    const product =
      await this.inboundBatchService.getProductOfInboundBatch(inboundBatch);

    let remainingQuantity = importTicket.quantity || 0;
    for (let i = 0; i < (createImportTicketDto.numberOfBigBatch || 0); i++) {
      await this.batchesService.create({
        quantity: 20,
        unit: 'kg',
        batchCode: inboundBatch.batchCode,
        importTicket: { id: importTicket.id },
        area: area ? { id: createImportTicketDto.area!.id } : null,
        product: product,
      });
      remainingQuantity -= 20;
    }

    for (let i = 0; i < (createImportTicketDto.numberOfSmallBatch || 0); i++) {
      await this.batchesService.create({
        quantity: 10,
        unit: 'kg',
        batchCode: inboundBatch.batchCode,
        importTicket: { id: importTicket.id },
        area: area ? { id: createImportTicketDto.area!.id } : null,
        product: product,
      });
      remainingQuantity -= 10;
    }

    if (remainingQuantity > 0) {
      await this.batchesService.create({
        quantity: remainingQuantity,
        unit: 'kg',
        batchCode: inboundBatch.batchCode,
        importTicket: { id: importTicket.id },
        area: area ? { id: createImportTicketDto.area!.id } : null,
        product: product,
      });
    }

    area.quantity = (area.quantity || 0) + (importTicket.quantity || 0);
    await this.areasService.update(area.id, area);

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

  remove(id: ImportTicket['id']) {
    return this.importTicketRepository.remove(id);
  }

  findByAreaWithPagination({
    areaId,
    paginationOptions,
  }: {
    areaId: string;
    paginationOptions: IPaginationOptions;
  }) {
    return this.importTicketRepository.findByAreaWithPagination({
      areaId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }
}
