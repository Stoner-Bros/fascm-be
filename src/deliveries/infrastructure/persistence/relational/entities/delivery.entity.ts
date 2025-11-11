import { TruckEntity } from '../../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';

import { HarvestScheduleEntity } from '../../../../../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';

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
  name: 'delivery',
})
export class DeliveryEntity extends EntityRelationalHelper {
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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
