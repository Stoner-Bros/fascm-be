import { TruckEntity } from '../../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'truck_setting',
})
export class TruckSettingEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  minHumidity?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  maxHumidity?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  minTemperature?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  maxTemperature?: number | null;

  @OneToOne(() => TruckEntity, { eager: true, nullable: true })
  @JoinColumn()
  truck?: TruckEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
