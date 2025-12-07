import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { HarvestScheduleStatusEnum } from '../../../../enum/harvest-schedule-status.enum';

@Entity({
  name: 'harvest_schedule',
})
export class HarvestScheduleEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  address?: string | null;

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
  supplier?: SupplierEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await HarvestScheduleEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `HS_${String(next).padStart(4, '0')}`;
  }

  @Column({
    nullable: true,
    type: String,
  })
  reason?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
