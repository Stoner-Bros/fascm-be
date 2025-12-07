import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import { HarvestPhaseEntity } from 'src/harvest-phases/infrastructure/persistence/relational/entities/harvest-phase.entity';
import { OrderPhaseEntity } from 'src/order-phases/infrastructure/persistence/relational/entities/order-phase.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'image_proof',
})
export class ImageProofEntity extends EntityRelationalHelper {
  @ManyToOne(
    () => OrderPhaseEntity,
    (parentEntity) => parentEntity.imageProof,
    { eager: false, nullable: true },
  )
  orderPhase: OrderPhaseEntity;

  @ManyToOne(
    () => HarvestPhaseEntity,
    (parentEntity) => parentEntity.imageProof,
    { eager: false, nullable: true },
  )
  harvestPhase: HarvestPhaseEntity;

  @OneToOne(() => FileEntity, { eager: true, nullable: true })
  @JoinColumn()
  photo?: FileEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
