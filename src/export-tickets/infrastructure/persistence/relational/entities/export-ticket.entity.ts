import { OrderDetailEntity } from '../../../../../order-details/infrastructure/persistence/relational/entities/order-detail.entity';

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
  name: 'export_ticket',
})
export class ExportTicketEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  numberOfBatch?: number | null;

  @Column({
    nullable: true,
    type: Date,
  })
  ExportDate?: Date | null;

  @OneToOne(() => OrderDetailEntity, { eager: true, nullable: true })
  @JoinColumn()
  orderDetail?: OrderDetailEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await ExportTicketEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `ET_${String(next).padStart(4, '0')}`;
  }
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
