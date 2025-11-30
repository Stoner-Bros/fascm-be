import { ConsigneeEntity } from '../../../../../consignees/infrastructure/persistence/relational/entities/consignee.entity';

import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  Column,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { OrderScheduleStatusEnum } from '../../../../enum/order-schedule-status.enum';

@Entity({
  name: 'order_schedule',
})
export class OrderScheduleEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  address?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: OrderScheduleStatusEnum,
  })
  status?: OrderScheduleStatusEnum | null;

  @Column({
    nullable: true,
    type: Date,
  })
  deliveryDate?: Date | null;

  @ManyToOne(() => ConsigneeEntity, { eager: true, nullable: true })
  consignee?: ConsigneeEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await OrderScheduleEntity.createQueryBuilder('os')
      .orderBy('os.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `ORDSCH_${String(next).padStart(4, '0')}`;
  }

  @Column({
    nullable: true,
    type: String,
  })
  reason?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
