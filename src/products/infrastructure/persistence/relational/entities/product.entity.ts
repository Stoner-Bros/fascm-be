import { CategoryEntity } from '../../../../../categories/infrastructure/persistence/relational/entities/category.entity';

import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'product',
})
export class ProductEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  pricePerKg?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  image?: string | null;

  @ManyToOne(() => CategoryEntity, { eager: true, nullable: true })
  categoryId?: CategoryEntity | null;

  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  storageHumidityRange?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  storageTemperatureRange?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  name?: string | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await ProductEntity.createQueryBuilder('p')
      .orderBy('p.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `PROD_${String(next).padStart(4, '0')}`;
  }
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
