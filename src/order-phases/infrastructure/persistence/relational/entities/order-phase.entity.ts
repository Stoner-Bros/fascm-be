import { OrderScheduleEntity } from '../../../../../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';

import { ImageProofEntity } from 'src/image-proofs/infrastructure/persistence/relational/entities/image-proof.entity';
import { OrderPhaseStatusEnum } from 'src/order-phases/enum/order-phase-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order_phase',
})
export class OrderPhaseEntity extends EntityRelationalHelper {
  @OneToMany(() => ImageProofEntity, (childEntity) => childEntity.orderPhase, {
    eager: true,
    nullable: true,
  })
  imageProof?: ImageProofEntity[] | null;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: OrderPhaseStatusEnum,
  })
  status?: OrderPhaseStatusEnum | null;

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
