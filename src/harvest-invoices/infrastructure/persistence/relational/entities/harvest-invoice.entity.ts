import { HarvestPhaseEntity } from '../../../../../harvest-phases/infrastructure/persistence/relational/entities/harvest-phase.entity';
import { HarvestInvoiceDetailEntity } from '../../../../../harvest-invoice-details/infrastructure/persistence/relational/entities/harvest-invoice-detail.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'harvest_invoice',
})
export class HarvestInvoiceEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  totalPayment?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  totalAmount?: number | null;

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
    type: Number,
  })
  vatAmount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  taxRate?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  accountNumber?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  paymentStatus?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  paymentMethod?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  invoiceNumber?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  invoiceUrl?: string | null;

  @OneToOne(() => HarvestPhaseEntity, { eager: true, nullable: true })
  @JoinColumn()
  harvestPhase?: HarvestPhaseEntity | null;

  @OneToMany(
    () => HarvestInvoiceDetailEntity,
    (harvestInvoiceDetail) => harvestInvoiceDetail.harvestInvoice,
  )
  harvestInvoiceDetails?: HarvestInvoiceDetailEntity[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
