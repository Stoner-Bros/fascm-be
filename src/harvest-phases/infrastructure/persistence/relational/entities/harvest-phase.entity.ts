import { HarvestScheduleEntity } from '../../../../../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';

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
  name: 'harvest_phase',
})
export class HarvestPhaseEntity extends EntityRelationalHelper {
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

  @ManyToOne(() => HarvestScheduleEntity, { eager: true, nullable: true })
  harvestSchedule?: HarvestScheduleEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
