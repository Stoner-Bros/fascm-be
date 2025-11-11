import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { HarvestDetailsService } from '../harvest-details/harvest-details.service';
import { HarvestDetail } from '../harvest-details/domain/harvest-detail';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateInboundBatchDto } from './dto/create-inbound-batch.dto';
import { UpdateInboundBatchDto } from './dto/update-inbound-batch.dto';
import { InboundBatchRepository } from './infrastructure/persistence/inbound-batch.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { InboundBatch } from './domain/inbound-batch';

@Injectable()
export class InboundBatchesService {
  constructor(
    private readonly productService: ProductsService,

    private readonly harvestDetailService: HarvestDetailsService,

    // Dependencies here
    private readonly inboundBatchRepository: InboundBatchRepository,
  ) {}

  async create(createInboundBatchDto: CreateInboundBatchDto) {
    // Do not remove comment below.
    // <creating-property />

    let product: Product | null | undefined = undefined;

    if (createInboundBatchDto.product) {
      const productObject = await this.productService.findById(
        createInboundBatchDto.product.id,
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
    } else if (createInboundBatchDto.product === null) {
      product = null;
    }

    let harvestDetail: HarvestDetail | null | undefined = undefined;

    if (createInboundBatchDto.harvestDetail) {
      const harvestDetailObject = await this.harvestDetailService.findById(
        createInboundBatchDto.harvestDetail.id,
      );
      if (!harvestDetailObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestDetail: 'notExists',
          },
        });
      }
      harvestDetail = harvestDetailObject;
    } else if (createInboundBatchDto.harvestDetail === null) {
      harvestDetail = null;
    }

    return this.inboundBatchRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      quantity: createInboundBatchDto.quantity,

      unit: createInboundBatchDto.unit,

      batchCode: createInboundBatchDto.batchCode,

      product,

      harvestDetail,
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

    let product: Product | null | undefined = undefined;

    if (updateInboundBatchDto.product) {
      const productObject = await this.productService.findById(
        updateInboundBatchDto.product.id,
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
    } else if (updateInboundBatchDto.product === null) {
      product = null;
    }

    let harvestDetail: HarvestDetail | null | undefined = undefined;

    if (updateInboundBatchDto.harvestDetail) {
      const harvestDetailObject = await this.harvestDetailService.findById(
        updateInboundBatchDto.harvestDetail.id,
      );
      if (!harvestDetailObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestDetail: 'notExists',
          },
        });
      }
      harvestDetail = harvestDetailObject;
    } else if (updateInboundBatchDto.harvestDetail === null) {
      harvestDetail = null;
    }

    return this.inboundBatchRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      quantity: updateInboundBatchDto.quantity,

      unit: updateInboundBatchDto.unit,

      batchCode: updateInboundBatchDto.batchCode,

      product,

      harvestDetail,
    });
  }

  remove(id: InboundBatch['id']) {
    return this.inboundBatchRepository.remove(id);
  }
}
