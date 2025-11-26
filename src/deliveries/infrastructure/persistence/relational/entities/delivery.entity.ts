import { TruckEntity } from '../../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';

import { HarvestScheduleEntity } from '../../../../../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';

import { OrderScheduleEntity } from '../../../../../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';

import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  Column,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'delivery',
})
export class DeliveryEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: 'double precision',
  })
  endLng?: number | null;

  @Column({
    nullable: true,
    type: 'double precision',
  })
  endLat?: number | null;

  @Column({
    nullable: true,
    type: 'double precision',
  })
  startLng?: number | null;

  @Column({
    nullable: true,
    type: 'double precision',
  })
  startLat?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  endAddress?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  startAddress?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @Column({
    nullable: true,
    type: Date,
  })
  endTime?: Date | null;

  @Column({
    nullable: true,
    type: Date,
  })
  startTime?: Date | null;

  @ManyToOne(() => TruckEntity, { eager: true, nullable: true })
  truck?: TruckEntity | null;

  @ManyToOne(() => HarvestScheduleEntity, { eager: true, nullable: true })
  harvestSchedule?: HarvestScheduleEntity | null;

  @ManyToOne(() => OrderScheduleEntity, { eager: true, nullable: true })
  orderSchedule?: OrderScheduleEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;
  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await DeliveryEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `DEL_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
