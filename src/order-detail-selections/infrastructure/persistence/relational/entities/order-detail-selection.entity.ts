import { ExportTicketEntity } from '../../../../../export-tickets/infrastructure/persistence/relational/entities/export-ticket.entity';

import { BatchEntity } from '../../../../../batches/infrastructure/persistence/relational/entities/batch.entity';

import { OrderDetailEntity } from '../../../../../order-details/infrastructure/persistence/relational/entities/order-detail.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order_detail_selection',
})
export class OrderDetailSelectionEntity extends EntityRelationalHelper {
  @ManyToOne(() => ExportTicketEntity, { eager: true, nullable: true })
  exportTicket?: ExportTicketEntity | null;

  @ManyToOne(() => BatchEntity, { eager: true, nullable: true })
  batch?: BatchEntity | null;

  @ManyToOne(() => OrderDetailEntity, { eager: true, nullable: true })
  orderDetail?: OrderDetailEntity | null;

  @Column({
    nullable: true,
    type: Number,
  })
  quantity?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  unitPrice?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  unit?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
