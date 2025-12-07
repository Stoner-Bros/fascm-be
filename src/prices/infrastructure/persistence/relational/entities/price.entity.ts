import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'price',
})
export class PriceEntity extends EntityRelationalHelper {
  @ManyToOne(() => ProductEntity, (parentEntity) => parentEntity.price, {
    eager: false,
    nullable: false,
  })
  product: ProductEntity;

  @Column({
    nullable: true,
    type: Number,
  })
  price?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  quantity?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  unit?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
