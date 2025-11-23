import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'consignee',
})
export class ConsigneeEntity extends EntityRelationalHelper {
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
    nullable: true,
    type: String,
  })
  organizationName?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  representativeName?: string | null;

  @OneToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn()
  user?: UserEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;
  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await ConsigneeEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `CONS_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
