import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderDetail } from '../order-details/domain/order-detail';

import { AreasService } from '../areas/areas.service';
import { Area } from '../areas/domain/area';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { ImportTicketsService } from '../import-tickets/import-tickets.service';
import { ImportTicket } from '../import-tickets/domain/import-ticket';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { BatchRepository } from './infrastructure/persistence/batch.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Batch } from './domain/batch';

@Injectable()
export class BatchesService {
  constructor(
    private readonly orderDetailService: OrderDetailsService,

    private readonly areaService: AreasService,

    private readonly productService: ProductsService,

    private readonly importTicketService: ImportTicketsService,

    // Dependencies here
    private readonly batchRepository: BatchRepository,
  ) {}

  async create(createBatchDto: CreateBatchDto) {
    // Do not remove comment below.
    // <creating-property />
    let orderDetail: OrderDetail | null | undefined = undefined;

    if (createBatchDto.orderDetail) {
      const orderDetailObject = await this.orderDetailService.findById(
        createBatchDto.orderDetail.id,
      );
      if (!orderDetailObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderDetail: 'notExists',
          },
        });
      }
      orderDetail = orderDetailObject;
    } else if (createBatchDto.orderDetail === null) {
      orderDetail = null;
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
      orderDetail,

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
    let orderDetail: OrderDetail | null | undefined = undefined;

    if (updateBatchDto.orderDetail) {
      const orderDetailObject = await this.orderDetailService.findById(
        updateBatchDto.orderDetail.id,
      );
      if (!orderDetailObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderDetail: 'notExists',
          },
        });
      }
      orderDetail = orderDetailObject;
    } else if (updateBatchDto.orderDetail === null) {
      orderDetail = null;
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
      orderDetail,

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
