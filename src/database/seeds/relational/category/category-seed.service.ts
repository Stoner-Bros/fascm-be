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
          name: 'Leafy Greens',
        },
        {
          name: 'Root Vegetables',
        },
        {
          name: 'Tropical Fruits',
        },
        {
          name: 'Temperate Fruits',
        },
        {
          name: 'Herbs & Spices',
        },
        {
          name: 'Mushrooms',
        },
        {
          name: 'Grains',
        },
        {
          name: 'Legumes',
        },
        {
          name: 'Dried Fruits',
        },
        {
          name: 'Organic Produce',
        },
      ];

      for (const category of categories) {
        await this.repository.save(this.repository.create(category));
      }
    }
  }
}
