import { WarehouseEntity } from '../../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'staff',
})
export class StaffEntity extends EntityRelationalHelper {
  @ManyToOne(() => WarehouseEntity, { eager: true, nullable: true })
  warehouse?: WarehouseEntity | null;

  @Column({
    nullable: true,
    type: String,
  })
  position?: string | null;

  @OneToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn()
  user?: UserEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
