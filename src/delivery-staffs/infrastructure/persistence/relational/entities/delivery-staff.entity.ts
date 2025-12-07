import { WarehouseEntity } from '../../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'delivery_staff',
})
export class DeliveryStaffEntity extends EntityRelationalHelper {
  @ManyToOne(() => WarehouseEntity, { eager: true, nullable: true })
  warehouse?: WarehouseEntity | null;

  @Column({
    nullable: true,
    type: Date,
  })
  licenseExpiredAt?: Date | null;

  @Column({
    nullable: true,
    type: String,
  })
  licensePhoto?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  licenseNumber?: string | null;

  @OneToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn()
  user: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
