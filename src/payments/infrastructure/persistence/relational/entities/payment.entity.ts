import { DebtEntity } from 'src/debts/infrastructure/persistence/relational/entities/debt.entity';
import {
  PaymentMethod,
  PaymentStatus,
  PaymentType,
} from 'src/payments/enums/payment-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'payment',
})
export class PaymentEntity extends EntityRelationalHelper {
  @ManyToOne(() => DebtEntity, { eager: true, nullable: true })
  @JoinColumn()
  debt?: DebtEntity | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: PaymentType,
  })
  paymentType?: PaymentType | null;

  @Column({
    nullable: true,
    type: String,
  })
  qrCode?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  paymentCode?: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: PaymentStatus,
  })
  status?: PaymentStatus | null;

  @Column({
    nullable: true,
    type: Number,
  })
  amount?: number | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod?: PaymentMethod | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
