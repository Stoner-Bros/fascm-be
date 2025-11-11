import { PaymentEntity } from '../../../../../payments/infrastructure/persistence/relational/entities/payment.entity';

import { OrderScheduleEntity } from '../../../../../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order',
})
export class OrderEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  totalVolume?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  totalMass?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  totalPayment?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  vatAmount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  totalAmount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  taxRate?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  orderDate?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  orderUrl?: string | null;

  @OneToOne(() => PaymentEntity, { eager: true, nullable: true })
  @JoinColumn()
  payment?: PaymentEntity | null;

  @OneToOne(() => OrderScheduleEntity, { eager: true, nullable: true })
  @JoinColumn()
  orderSchedule?: OrderScheduleEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
