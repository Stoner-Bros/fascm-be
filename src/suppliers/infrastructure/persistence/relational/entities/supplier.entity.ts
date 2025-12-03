import { WarehouseEntity } from '../../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
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

  @PrimaryColumn({
    type: String,
  })
  id: string;
  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await SupplierEntity.createQueryBuilder('s')
      .orderBy('s.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `SUP_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
