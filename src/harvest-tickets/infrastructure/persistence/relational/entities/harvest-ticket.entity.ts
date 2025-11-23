import { HarvestScheduleEntity } from '../../../../../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';

import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'harvest_ticket',
})
export class HarvestTicketEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Date,
  })
  date?: Date | null;

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
  accountNumber?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  paymentMethod?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  ticketNumber?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  ticketUrl?: string | null;

  @OneToOne(() => HarvestScheduleEntity, { eager: true, nullable: true })
  @JoinColumn()
  harvestScheduleId?: HarvestScheduleEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await HarvestTicketEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `HT_${String(next).padStart(4, '0')}`;
  }
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
