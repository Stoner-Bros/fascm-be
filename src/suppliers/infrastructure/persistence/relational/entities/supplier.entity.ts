import { WarehouseEntity } from '../../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier',
})
export class SupplierEntity extends EntityRelationalHelper {
  @ManyToOne(() => WarehouseEntity, { eager: true, nullable: true })
  warehouse?: WarehouseEntity | null;

  @OneToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn()
  user?: UserEntity | null;

  @Column({
    nullable: true,
    type: String,
  })
  contact?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  taxCode?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  address?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  certificate?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  qrCode?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  gardenName: string;

  @Column({
    nullable: false,
    type: String,
  })
  representativeName: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
