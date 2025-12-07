import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { HarvestInvoiceEntity } from '../../../../../harvest-invoices/infrastructure/persistence/relational/entities/harvest-invoice.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'harvest_invoice_detail',
})
export class HarvestInvoiceDetailEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  amount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  taxRate?: number | null;

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

  @OneToOne(() => ProductEntity, { eager: true, nullable: true })
  @JoinColumn()
  product?: ProductEntity | null;

  @ManyToOne(() => HarvestInvoiceEntity, { eager: true, nullable: true })
  harvestInvoice?: HarvestInvoiceEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
