import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../../../categories/infrastructure/persistence/relational/entities/category.entity';

@Injectable()
export class CategorySeedService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const categories = [
        {
          vietnameseName: 'Rau lá xanh',
          englishName: 'Leafy Greens',
        },
        {
          vietnameseName: 'Củ quả',
          englishName: 'Root Vegetables',
        },
        {
          vietnameseName: 'Trái cây nhiệt đới',
          englishName: 'Tropical Fruits',
        },
        {
          vietnameseName: 'Trái cây ôn đới',
          englishName: 'Temperate Fruits',
        },
        {
          vietnameseName: 'Rau gia vị',
          englishName: 'Herbs & Spices',
        },
        {
          vietnameseName: 'Nấm các loại',
          englishName: 'Mushrooms',
        },
        {
          vietnameseName: 'Ngũ cốc',
          englishName: 'Grains',
        },
        {
          vietnameseName: 'Đậu các loại',
          englishName: 'Legumes',
        },
        {
          vietnameseName: 'Hoa quả khô',
          englishName: 'Dried Fruits',
        },
        {
          vietnameseName: 'Rau quả hữu cơ',
          englishName: 'Organic Produce',
        },
      ];

      for (const category of categories) {
        await this.repository.save(this.repository.create(category));
      }
    }
  }
}
