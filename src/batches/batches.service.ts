import { AreasService } from '../areas/areas.service';
import { Area } from '../areas/domain/area';

import { Product } from '../products/domain/product';
import { ProductsService } from '../products/products.service';

import { ImportTicket } from '../import-tickets/domain/import-ticket';
import { ImportTicketsService } from '../import-tickets/import-tickets.service';

import {
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ExportTicket } from 'src/export-tickets/domain/export-ticket';
import { ExportTicketsService } from 'src/export-tickets/export-tickets.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Batch } from './domain/batch';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { BatchRepository } from './infrastructure/persistence/batch.repository';

@Injectable()
export class BatchesService {
  constructor(
    @Inject(forwardRef(() => ExportTicketsService))
    private readonly exportTicketService: ExportTicketsService,

    private readonly areaService: AreasService,

    private readonly productService: ProductsService,

    @Inject(forwardRef(() => ImportTicketsService))
    private readonly importTicketService: ImportTicketsService,

    // Dependencies here
    private readonly batchRepository: BatchRepository,
  ) {}

  async create(createBatchDto: CreateBatchDto) {
    // Do not remove comment below.
    // <creating-property />
    let exportTicket: ExportTicket | null | undefined = undefined;

    if (createBatchDto.exportTicket) {
      const exportTicketObject = await this.exportTicketService.findById(
        createBatchDto.exportTicket.id,
      );
      if (!exportTicketObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            exportTicket: 'notExists',
          },
        });
      }
      exportTicket = exportTicketObject;
    } else if (createBatchDto.exportTicket === null) {
      exportTicket = null;
    }

    let area: Area | null | undefined = undefined;

    if (createBatchDto.area) {
      const areaObject = await this.areaService.findById(
        createBatchDto.area.id,
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
    } else if (createBatchDto.area === null) {
      area = null;
    }

    let product: Product | null | undefined = undefined;

    if (createBatchDto.product) {
      const productObject = await this.productService.findById(
        createBatchDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    } else if (createBatchDto.product === null) {
      product = null;
    }

    let importTicket: ImportTicket | null | undefined = undefined;

    if (createBatchDto.importTicket) {
      const importTicketObject = await this.importTicketService.findById(
        createBatchDto.importTicket.id,
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
    } else if (createBatchDto.importTicket === null) {
      importTicket = null;
    }

    return this.batchRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      exportTicket,

      volume: createBatchDto.volume,

      quantity: createBatchDto.quantity,

      unit: createBatchDto.unit,

      batchCode: createBatchDto.batchCode,

      area,

      product,

      importTicket,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.batchRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Batch['id']) {
    return this.batchRepository.findById(id);
  }

  findByIds(ids: Batch['id'][]) {
    return this.batchRepository.findByIds(ids);
  }

  async update(
    id: Batch['id'],

    updateBatchDto: UpdateBatchDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let exportTicket: ExportTicket | null | undefined = undefined;

    if (updateBatchDto.exportTicket) {
      const exportTicketObject = await this.exportTicketService.findById(
        updateBatchDto.exportTicket.id,
      );
      if (!exportTicketObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            exportTicket: 'notExists',
          },
        });
      }
      exportTicket = exportTicketObject;
    } else if (updateBatchDto.exportTicket === null) {
      exportTicket = null;
    }

    let area: Area | null | undefined = undefined;

    if (updateBatchDto.area) {
      const areaObject = await this.areaService.findById(
        updateBatchDto.area.id,
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
    } else if (updateBatchDto.area === null) {
      area = null;
    }

    let product: Product | null | undefined = undefined;

    if (updateBatchDto.product) {
      const productObject = await this.productService.findById(
        updateBatchDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    } else if (updateBatchDto.product === null) {
      product = null;
    }

    let importTicket: ImportTicket | null | undefined = undefined;

    if (updateBatchDto.importTicket) {
      const importTicketObject = await this.importTicketService.findById(
        updateBatchDto.importTicket.id,
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
    } else if (updateBatchDto.importTicket === null) {
      importTicket = null;
    }

    return this.batchRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      exportTicket,

      volume: updateBatchDto.volume,

      quantity: updateBatchDto.quantity,

      unit: updateBatchDto.unit,

      batchCode: updateBatchDto.batchCode,

      area,

      product,

      importTicket,
    });
  }

  remove(id: Batch['id']) {
    return this.batchRepository.remove(id);
  }
}
