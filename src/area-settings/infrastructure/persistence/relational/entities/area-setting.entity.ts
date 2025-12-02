import { AreaEntity } from '../../../../../areas/infrastructure/persistence/relational/entities/area.entity';

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
  name: 'area_setting',
})
export class AreaSettingEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  minCapacity?: number | null;

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

  @OneToOne(() => AreaEntity, { eager: true, nullable: true })
  @JoinColumn()
  area?: AreaEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
