import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../../../categories/infrastructure/persistence/relational/entities/category.entity';
import { ProductEntity } from '../../../../products/infrastructure/persistence/relational/entities/product.entity';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async run() {
    const count = await this.productRepository.count();

    if (!count) {
      const categories = await this.categoryRepository.find();

      if (categories.length > 0) {
        // Lấy một số category để gán cho products
        const rootVeg = categories.find((c) => c.name === 'Vegetables');
        const tropicalFruits = categories.find((c) => c.name === 'Fruits');

        const products = [
          // Củ quả
          {
            name: 'Cà rốt',
            description: 'Cà rốt tươi, giàu beta-carotene',
            status: 'active',
            category: rootVeg,
            image: null,
          },
          {
            name: 'Khoai tây',
            description: 'Khoai tây Đà Lạt chất lượng cao',
            status: 'active',
            category: rootVeg,
            image: null,
          },
          {
            name: 'Củ cải trắng',
            description: 'Củ cải trắng tươi ngon',
            status: 'active',
            category: rootVeg,
            image: null,
          },

          // Trái cây nhiệt đới
          {
            name: 'Xoài',
            description: 'Xoài ngọt thơm',
            status: 'active',
            category: tropicalFruits,
            image: null,
          },
          {
            name: 'Chuối',
            description: 'Chuối ngon ngọt',
            status: 'active',
            category: tropicalFruits,
            image: null,
          },
        ];

        for (const product of products) {
          await this.productRepository.save(
            this.productRepository.create(product),
          );
        }
      }
    }
  }
}
