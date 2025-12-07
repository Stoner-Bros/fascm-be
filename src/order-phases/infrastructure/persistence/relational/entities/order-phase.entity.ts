import { OrderScheduleEntity } from '../../../../../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order_phase',
})
export class OrderPhaseEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  phaseNumber?: number | null;

  @ManyToOne(() => OrderScheduleEntity, { eager: true, nullable: true })
  orderSchedule?: OrderScheduleEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
