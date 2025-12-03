import { OrderScheduleEntity } from '../../../../../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';

import { HarvestScheduleEntity } from '../../../../../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';

import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'image_proof',
})
export class ImageProofEntity extends EntityRelationalHelper {
  @ManyToOne(
    () => OrderScheduleEntity,
    (parentEntity) => parentEntity.imageProof,
    { eager: false, nullable: true },
  )
  orderSchedule: OrderScheduleEntity;

  @ManyToOne(
    () => HarvestScheduleEntity,
    (parentEntity) => parentEntity.imageProof,
    { eager: false, nullable: true },
  )
  harvestSchedule: HarvestScheduleEntity;

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
