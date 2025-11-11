import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { OrderEntity } from '../../../../../orders/infrastructure/persistence/relational/entities/order.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order_detail',
})
export class OrderDetailEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  taxRate?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  amount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  unitPrice?: number | null;

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

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  product?: ProductEntity | null;

  @ManyToOne(() => OrderEntity, { eager: true, nullable: true })
  order?: OrderEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
