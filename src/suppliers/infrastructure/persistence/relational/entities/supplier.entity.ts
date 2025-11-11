import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier',
})
export class SupplierEntity extends EntityRelationalHelper {
  @OneToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn()
  user: UserEntity;

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
