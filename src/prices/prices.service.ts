import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PriceRepository } from './infrastructure/persistence/price.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Price } from './domain/price';

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
      createPriceDto.product.id,
    );
    if (!productObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }
    const product = productObject;

    return this.priceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      product,

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
    let product: Product | undefined = undefined;

    if (updatePriceDto.product) {
      const productObject = await this.productService.findById(
        updatePriceDto.product.id,
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
    }

    return this.priceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      product,

      price: updatePriceDto.price,

      quantity: updatePriceDto.quantity,

      unit: updatePriceDto.unit,
    });
  }

  remove(id: Price['id']) {
    return this.priceRepository.remove(id);
  }
}
