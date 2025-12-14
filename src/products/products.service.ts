import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/domain/category';

import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Product } from './domain/product';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly categoryService: CategoriesService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property /

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
