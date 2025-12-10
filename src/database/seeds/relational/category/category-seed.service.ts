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
          name: 'Vegetables',
        },
        {
          name: 'Fruits',
        },
      ];

      for (const category of categories) {
        await this.repository.save(this.repository.create(category));
      }
    }
  }
}
