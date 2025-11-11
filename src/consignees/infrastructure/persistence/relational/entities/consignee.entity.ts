import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
