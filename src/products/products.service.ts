import { PricesService } from '../prices/prices.service';
import { Price } from '../prices/domain/price';

import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/domain/category';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Product } from './domain/product';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(forwardRef(() => PricesService))
    private readonly priceService: PricesService,

    private readonly categoryService: CategoriesService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property />
    let price: Price[] | null | undefined = undefined;

    if (createProductDto.price) {
      const priceObjects = await this.priceService.findByIds(
        createProductDto.price.map((entity) => entity.id),
      );
      if (priceObjects.length !== createProductDto.price.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            price: 'notExists',
          },
        });
      }
      price = priceObjects;
    } else if (createProductDto.price === null) {
      price = null;
    }

    let category: Category | null | undefined = undefined;

    if (createProductDto.category) {
      const categoryObject = await this.categoryService.findById(
        createProductDto.category.id,
      );
      if (!categoryObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            categoryId: 'notExists',
          },
        });
      }
      category = categoryObject;
    } else if (createProductDto.category === null) {
      category = null;
    }

    return this.productRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      price,

      image: createProductDto.image,

      category,
      status: 'Active',

      description: createProductDto.description,

      name: createProductDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { categoryId?: string; categoryIds?: string[] };
  }) {
    return this.productRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
    });
  }

  findById(id: Product['id']) {
    return this.productRepository.findById(id);
  }

  findByIds(ids: Product['id'][]) {
    return this.productRepository.findByIds(ids);
  }

  async update(
    id: Product['id'],

    updateProductDto: UpdateProductDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let price: Price[] | null | undefined = undefined;

    if (updateProductDto.price) {
      const priceObjects = await this.priceService.findByIds(
        updateProductDto.price.map((entity) => entity.id),
      );
      if (priceObjects.length !== updateProductDto.price.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            price: 'notExists',
          },
        });
      }
      price = priceObjects;
    } else if (updateProductDto.price === null) {
      price = null;
    }

    let category: Category | null | undefined = undefined;

    if (updateProductDto.category) {
      const categoryObject = await this.categoryService.findById(
        updateProductDto.category.id,
      );
      if (!categoryObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            categoryId: 'notExists',
          },
        });
      }
      category = categoryObject;
    } else if (updateProductDto.category === null) {
      category = null;
    }

    return this.productRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      price,

      image: updateProductDto.image,

      category,
      description: updateProductDto.description,

      name: updateProductDto.name,
    });
  }

  remove(id: Product['id']) {
    return this.productRepository.remove(id);
  }

  async updateStatus(id: Product['id']) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }
    return this.productRepository.update(id, {
      status: product.status === 'Active' ? 'Inactive' : 'Active',
    });
  }
}
