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
        const leafyGreens = categories.find(
          (c) => c.englishName === 'Leafy Greens',
        );
        const rootVeg = categories.find(
          (c) => c.englishName === 'Root Vegetables',
        );
        const tropicalFruits = categories.find(
          (c) => c.englishName === 'Tropical Fruits',
        );
        const temperatesFruits = categories.find(
          (c) => c.englishName === 'Temperate Fruits',
        );
        const herbs = categories.find(
          (c) => c.englishName === 'Herbs & Spices',
        );
        const mushrooms = categories.find((c) => c.englishName === 'Mushrooms');

        const products = [
          // Rau lá xanh
          {
            name: 'Cải bó xôi',
            description: 'Rau cải bó xôi tươi, giàu vitamin K và sắt',
            pricePerKg: 25000,
            status: 'active',
            minStorageTemperature: '2°C',
            maxStorageTemperature: '4°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '95%',
            categoryId: leafyGreens,
            image: null,
          },
          {
            name: 'Xà lách',
            description: 'Xà lách tươi, giòn ngọt',
            pricePerKg: 30000,
            status: 'active',
            minStorageTemperature: '1°C',
            maxStorageTemperature: '3°C',
            minStorageHumidity: '90%',
            maxStorageHumidity: '98%',
            categoryId: leafyGreens,
            image: null,
          },
          {
            name: 'Rau muống',
            description: 'Rau muống tươi, nguồn cung cấp vitamin A tốt',
            pricePerKg: 15000,
            status: 'active',
            minStorageTemperature: '10°C',
            maxStorageTemperature: '15°C',
            minStorageHumidity: '80%',
            maxStorageHumidity: '90%',
            categoryId: leafyGreens,
            image: null,
          },

          // Củ quả
          {
            name: 'Cà rốt',
            description: 'Cà rốt tươi, giàu beta-carotene',
            pricePerKg: 20000,
            status: 'active',
            minStorageTemperature: '0°C',
            maxStorageTemperature: '2°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '95%',
            categoryId: rootVeg,
            image: null,
          },
          {
            name: 'Khoai tây',
            description: 'Khoai tây Đà Lạt chất lượng cao',
            pricePerKg: 18000,
            status: 'active',
            minStorageTemperature: '7°C',
            maxStorageTemperature: '10°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '90%',
            categoryId: rootVeg,
            image: null,
          },
          {
            name: 'Củ cải trắng',
            description: 'Củ cải trắng tươi ngon',
            pricePerKg: 12000,
            status: 'active',
            minStorageTemperature: '0°C',
            maxStorageTemperature: '2°C',
            minStorageHumidity: '90%',
            maxStorageHumidity: '95%',
            categoryId: rootVeg,
            image: null,
          },

          // Trái cây nhiệt đới
          {
            name: 'Xoài',
            description: 'Xoài cát Hòa Lộc ngọt thơm',
            pricePerKg: 80000,
            status: 'active',
            minStorageTemperature: '12°C',
            maxStorageTemperature: '15°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '90%',
            categoryId: tropicalFruits,
            image: null,
          },
          {
            name: 'Chuối',
            description: 'Chuối Laba ngon ngọt',
            pricePerKg: 25000,
            status: 'active',
            minStorageTemperature: '13°C',
            maxStorageTemperature: '17°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '90%',
            categoryId: tropicalFruits,
            image: null,
          },
          {
            name: 'Dứa',
            description: 'Dứa Queen tươi ngọt',
            pricePerKg: 35000,
            status: 'active',
            minStorageTemperature: '7°C',
            maxStorageTemperature: '13°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '90%',
            categoryId: tropicalFruits,
            image: null,
          },

          // Trái cây ôn đới
          {
            name: 'Táo',
            description: 'Táo Fuji nhập khẩu',
            pricePerKg: 120000,
            status: 'active',
            minStorageTemperature: '0°C',
            maxStorageTemperature: '4°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '90%',
            categoryId: temperatesFruits,
            image: null,
          },
          {
            name: 'Cam',
            description: 'Cam Vinh tươi ngọt',
            pricePerKg: 45000,
            status: 'active',
            minStorageTemperature: '3°C',
            maxStorageTemperature: '8°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '90%',
            categoryId: temperatesFruits,
            image: null,
          },

          // Rau gia vị
          {
            name: 'Ngò rí',
            description: 'Ngò rí tươi thơm',
            pricePerKg: 50000,
            status: 'active',
            minStorageTemperature: '0°C',
            maxStorageTemperature: '2°C',
            minStorageHumidity: '90%',
            maxStorageHumidity: '95%',
            categoryId: herbs,
            image: null,
          },
          {
            name: 'Húng quế',
            description: 'Húng quế tây tươi',
            pricePerKg: 80000,
            status: 'active',
            minStorageTemperature: '8°C',
            maxStorageTemperature: '12°C',
            minStorageHumidity: '90%',
            maxStorageHumidity: '95%',
            categoryId: herbs,
            image: null,
          },

          // Nấm
          {
            name: 'Nấm kim châm',
            description: 'Nấm kim châm tươi Đà Lạt',
            pricePerKg: 35000,
            status: 'active',
            minStorageTemperature: '2°C',
            maxStorageTemperature: '4°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '90%',
            categoryId: mushrooms,
            image: null,
          },
          {
            name: 'Nấm đùi gà',
            description: 'Nấm đùi gà hữu cơ',
            pricePerKg: 45000,
            status: 'active',
            minStorageTemperature: '2°C',
            maxStorageTemperature: '4°C',
            minStorageHumidity: '85%',
            maxStorageHumidity: '90%',
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
