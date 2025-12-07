import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../../products/infrastructure/persistence/relational/entities/product.entity';
import { CategoryEntity } from '../../../../categories/infrastructure/persistence/relational/entities/category.entity';

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
        const leafyGreens = categories.find((c) => c.name === 'Leafy Greens');
        const rootVeg = categories.find((c) => c.name === 'Root Vegetables');
        const tropicalFruits = categories.find(
          (c) => c.name === 'Tropical Fruits',
        );
        const temperatesFruits = categories.find(
          (c) => c.name === 'Temperate Fruits',
        );
        const herbs = categories.find((c) => c.name === 'Herbs & Spices');
        const mushrooms = categories.find((c) => c.name === 'Mushrooms');

        const products = [
          // Rau lá xanh
          {
            name: 'Cải bó xôi',
            description: 'Rau cải bó xôi tươi, giàu vitamin K và sắt',
            status: 'active',
            categoryId: leafyGreens,
            image: null,
          },
          {
            name: 'Xà lách',
            description: 'Xà lách tươi, giòn ngọt',
            status: 'active',
            categoryId: leafyGreens,
            image: null,
          },
          {
            name: 'Rau muống',
            description: 'Rau muống tươi, nguồn cung cấp vitamin A tốt',
            status: 'active',
            categoryId: leafyGreens,
            image: null,
          },

          // Củ quả
          {
            name: 'Cà rốt',
            description: 'Cà rốt tươi, giàu beta-carotene',
            status: 'active',
            categoryId: rootVeg,
            image: null,
          },
          {
            name: 'Khoai tây',
            description: 'Khoai tây Đà Lạt chất lượng cao',
            status: 'active',
            categoryId: rootVeg,
            image: null,
          },
          {
            name: 'Củ cải trắng',
            description: 'Củ cải trắng tươi ngon',
            status: 'active',
            categoryId: rootVeg,
            image: null,
          },

          // Trái cây nhiệt đới
          {
            name: 'Xoài',
            description: 'Xoài cát Hòa Lộc ngọt thơm',
            status: 'active',
            categoryId: tropicalFruits,
            image: null,
          },
          {
            name: 'Chuối',
            description: 'Chuối Laba ngon ngọt',
            status: 'active',
            categoryId: tropicalFruits,
            image: null,
          },
          {
            name: 'Dứa',
            description: 'Dứa Queen tươi ngọt',
            status: 'active',
            categoryId: tropicalFruits,
            image: null,
          },

          // Trái cây ôn đới
          {
            name: 'Táo',
            description: 'Táo Fuji nhập khẩu',
            status: 'active',
            categoryId: temperatesFruits,
            image: null,
          },
          {
            name: 'Cam',
            description: 'Cam Vinh tươi ngọt',
            status: 'active',
            categoryId: temperatesFruits,
            image: null,
          },

          // Rau gia vị
          {
            name: 'Ngò rí',
            description: 'Ngò rí tươi thơm',
            status: 'active',
            categoryId: herbs,
            image: null,
          },
          {
            name: 'Húng quế',
            description: 'Húng quế tây tươi',
            status: 'active',
            categoryId: herbs,
            image: null,
          },

          // Nấm
          {
            name: 'Nấm kim châm',
            description: 'Nấm kim châm tươi Đà Lạt',
            status: 'active',
            categoryId: mushrooms,
            image: null,
          },
          {
            name: 'Nấm đùi gà',
            description: 'Nấm đùi gà hữu cơ',
            status: 'active',
            categoryId: mushrooms,
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
