import { OrderDetailEntity } from '../../../../../order-details/infrastructure/persistence/relational/entities/order-detail.entity';

import { AreaEntity } from '../../../../../areas/infrastructure/persistence/relational/entities/area.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { ImportTicketEntity } from '../../../../../import-tickets/infrastructure/persistence/relational/entities/import-ticket.entity';

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
  name: 'batch',
})
export class BatchEntity extends EntityRelationalHelper {
  @ManyToOne(() => OrderDetailEntity, { eager: true, nullable: true })
  orderDetail?: OrderDetailEntity | null;

  @Column({
    nullable: true,
    type: Number,
  })
  volume?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  quantity?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  unit?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  batchCode?: string | null;

  @ManyToOne(() => AreaEntity, { eager: true, nullable: true })
  area?: AreaEntity | null;

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  product?: ProductEntity | null;

  @ManyToOne(() => ImportTicketEntity, { eager: true, nullable: true })
  importTicket?: ImportTicketEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
