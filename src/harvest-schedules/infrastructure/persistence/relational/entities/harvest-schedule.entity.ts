import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { HarvestScheduleStatusEnum } from '../../../../harvest-schedule-status.enum';

@Entity({
  name: 'harvest_schedule',
})
export class HarvestScheduleEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: HarvestScheduleStatusEnum,
  })
  status?: HarvestScheduleStatusEnum | null;

  @Column({
    nullable: true,
    type: Date,
  })
  harvestDate?: Date | null;

  @ManyToOne(() => SupplierEntity, { eager: true, nullable: true })
  supplierId?: SupplierEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
