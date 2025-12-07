import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'notification',
})
export class NotificationEntity extends EntityRelationalHelper {
  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  user?: UserEntity | null;

  @Column({
    nullable: true,
    type: Date,
  })
  deletedAt?: Date | null;

  @Column({
    nullable: true,
    type: Boolean,
  })
  isRead?: boolean | null;

  @Column({
    nullable: true,
    type: String,
  })
  type?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  message?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  title?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
