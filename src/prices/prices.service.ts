import { ProductsService } from '../products/products.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { Batch } from 'src/batches/domain/batch';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Price } from './domain/price';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PriceRepository } from './infrastructure/persistence/price.repository';

@Injectable()
export class PricesService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,

    // Dependencies here
    private readonly priceRepository: PriceRepository,
  ) {}

  async create(createPriceDto: CreatePriceDto) {
    // Do not remove comment below.
    // <creating-property />
    const productObject = await this.productService.findById(
      createPriceDto.batch.id,
    );
    if (!productObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }
    const batch = productObject;

    return this.priceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      batch,

      price: createPriceDto.price,

      quantity: createPriceDto.quantity,

      unit: createPriceDto.unit,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.priceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Price['id']) {
    return this.priceRepository.findById(id);
  }

  findByIds(ids: Price['id'][]) {
    return this.priceRepository.findByIds(ids);
  }

  async update(
    id: Price['id'],

    updatePriceDto: UpdatePriceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let batch: Batch | undefined = undefined;

    if (updatePriceDto.batch) {
      const batchObject = await this.productService.findById(
        updatePriceDto.batch.id,
      );
      if (!batchObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            batch: 'notExists',
          },
        });
      }
      batch = batchObject;
    }

    return this.priceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      batch,

      price: updatePriceDto.price,

      quantity: updatePriceDto.quantity,

      unit: updatePriceDto.unit,
    });
  }

  remove(id: Price['id']) {
    return this.priceRepository.remove(id);
  }

  findByBatchId(batchId: string) {
    return this.priceRepository.findByBatchId(batchId);
  }
}
