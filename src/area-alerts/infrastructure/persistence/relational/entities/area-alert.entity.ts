import { AreaEntity } from '../../../../../areas/infrastructure/persistence/relational/entities/area.entity';

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
  name: 'area_alert',
})
export class AreaAlertEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  message?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  alertType?: string | null;

  @ManyToOne(() => AreaEntity, { eager: true, nullable: true })
  area?: AreaEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
