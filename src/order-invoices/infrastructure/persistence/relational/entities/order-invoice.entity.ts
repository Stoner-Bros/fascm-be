import { PaymentEntity } from '../../../../../payments/infrastructure/persistence/relational/entities/payment.entity';

import { OrderPhaseEntity } from 'src/order-phases/infrastructure/persistence/relational/entities/order-phase.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order_invoice',
})
export class OrderInvoiceEntity extends EntityRelationalHelper {
  @OneToOne(() => PaymentEntity, { eager: true, nullable: true })
  @JoinColumn()
  payment?: PaymentEntity | null;

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
    type: Number,
  })
  invoiceNumber?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  invoiceUrl?: string | null;

  @OneToOne(() => OrderPhaseEntity, { eager: true, nullable: true })
  @JoinColumn()
  orderPhase?: OrderPhaseEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
