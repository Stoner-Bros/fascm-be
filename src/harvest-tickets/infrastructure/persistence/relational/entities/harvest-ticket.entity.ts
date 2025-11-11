import { HarvestScheduleEntity } from '../../../../../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';

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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
