import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { HarvestDetailEntity } from '../../../../../harvest-details/infrastructure/persistence/relational/entities/harvest-detail.entity';

import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  Column,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'inbound_batch',
})
export class InboundBatchEntity extends EntityRelationalHelper {
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

  @Column({
    nullable: true,
    type: String,
  })
  batchCode?: string | null;

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  product?: ProductEntity | null;

  @OneToOne(() => HarvestDetailEntity, { eager: true, nullable: true })
  @JoinColumn()
  harvestDetail?: HarvestDetailEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await InboundBatchEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `IB_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
