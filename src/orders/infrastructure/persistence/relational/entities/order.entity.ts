import { PaymentEntity } from '../../../../../payments/infrastructure/persistence/relational/entities/payment.entity';

import { OrderScheduleEntity } from '../../../../../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';

import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryColumn,
  BeforeInsert,
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

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await OrderEntity.createQueryBuilder('o')
      .orderBy('o.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `ORD_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
