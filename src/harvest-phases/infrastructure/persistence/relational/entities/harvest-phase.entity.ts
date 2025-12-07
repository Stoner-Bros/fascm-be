import { HarvestScheduleEntity } from '../../../../../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';

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
import { ImageProofEntity } from 'src/image-proofs/infrastructure/persistence/relational/entities/image-proof.entity';
import { HarvestPhaseStatusEnum } from 'src/harvest-phases/enum/harvest-phase-status.enum';

@Entity({
  name: 'harvest_phase',
})
export class HarvestPhaseEntity extends EntityRelationalHelper {
  @OneToMany(
    () => ImageProofEntity,
    (childEntity) => childEntity.harvestPhase,
    { eager: true, nullable: true },
  )
  imageProof?: ImageProofEntity[] | null;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: HarvestPhaseStatusEnum,
  })
  status?: HarvestPhaseStatusEnum | null;

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
