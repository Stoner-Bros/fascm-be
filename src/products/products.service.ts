import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/domain/category';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Product } from './domain/product';

@Injectable()
export class ProductsService {
  constructor(
    private readonly categoryService: CategoriesService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property />

    let categoryId: Category | null | undefined = undefined;

    if (createProductDto.categoryId) {
      const categoryIdObject = await this.categoryService.findById(
        createProductDto.categoryId.id,
      );
      if (!categoryIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            categoryId: 'notExists',
          },
        });
      }
      categoryId = categoryIdObject;
    } else if (createProductDto.categoryId === null) {
      categoryId = null;
    }

    return this.productRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      pricePerKg: createProductDto.pricePerKg,

      image: createProductDto.image,

      categoryId,

      status: createProductDto.status,

      storageHumidityRange: createProductDto.storageHumidityRange,

      storageTemperatureRange: createProductDto.storageTemperatureRange,

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

    let categoryId: Category | null | undefined = undefined;

    if (updateProductDto.categoryId) {
      const categoryIdObject = await this.categoryService.findById(
        updateProductDto.categoryId.id,
      );
      if (!categoryIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            categoryId: 'notExists',
          },
        });
      }
      categoryId = categoryIdObject;
    } else if (updateProductDto.categoryId === null) {
      categoryId = null;
    }

    return this.productRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      pricePerKg: updateProductDto.pricePerKg,

      image: updateProductDto.image,

      categoryId,

      status: updateProductDto.status,

      storageHumidityRange: updateProductDto.storageHumidityRange,

      storageTemperatureRange: updateProductDto.storageTemperatureRange,

      description: updateProductDto.description,

      name: updateProductDto.name,
    });
  }

  remove(id: Product['id']) {
    return this.productRepository.remove(id);
  }
}
