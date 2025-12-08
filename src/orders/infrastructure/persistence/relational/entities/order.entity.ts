import { OrderScheduleEntity } from '../../../../../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';

import { OrderDetailEntity } from 'src/order-details/infrastructure/persistence/relational/entities/order-detail.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order',
})
export class OrderEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  unit?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  quantity?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  orderNumber?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  orderUrl?: string | null;

  @OneToOne(() => OrderScheduleEntity, { eager: true, nullable: true })
  @JoinColumn()
  orderSchedule?: OrderScheduleEntity | null;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails?: OrderDetailEntity[];

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
