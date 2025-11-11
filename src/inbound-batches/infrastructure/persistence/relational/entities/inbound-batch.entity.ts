import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { HarvestDetailEntity } from '../../../../../harvest-details/infrastructure/persistence/relational/entities/harvest-detail.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  Column,
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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
