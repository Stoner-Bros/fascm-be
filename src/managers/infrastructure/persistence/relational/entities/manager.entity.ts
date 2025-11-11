import { WarehouseEntity } from '../../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'manager',
})
export class ManagerEntity extends EntityRelationalHelper {
  @OneToOne(() => WarehouseEntity, { eager: true, nullable: true })
  @JoinColumn()
  warehouse?: WarehouseEntity | null;

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
