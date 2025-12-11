import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { HarvestInvoiceEntity } from '../../../../../harvest-invoices/infrastructure/persistence/relational/entities/harvest-invoice.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
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
