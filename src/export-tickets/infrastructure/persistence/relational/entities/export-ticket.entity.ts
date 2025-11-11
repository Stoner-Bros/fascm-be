import { OrderDetailEntity } from '../../../../../order-details/infrastructure/persistence/relational/entities/order-detail.entity';

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
  name: 'export_ticket',
})
export class ExportTicketEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  numberOfBatch?: number | null;

  @Column({
    nullable: true,
    type: Date,
  })
  ExportDate?: Date | null;

  @OneToOne(() => OrderDetailEntity, { eager: true, nullable: true })
  @JoinColumn()
  orderDetail?: OrderDetailEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
