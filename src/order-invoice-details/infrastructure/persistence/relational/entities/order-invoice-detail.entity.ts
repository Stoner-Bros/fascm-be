import { ExportTicketEntity } from '../../../../../export-tickets/infrastructure/persistence/relational/entities/export-ticket.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { OrderInvoiceEntity } from '../../../../../order-invoices/infrastructure/persistence/relational/entities/order-invoice.entity';

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
  name: 'order_invoice_detail',
})
export class OrderInvoiceDetailEntity extends EntityRelationalHelper {
  @OneToOne(() => ExportTicketEntity, { eager: true, nullable: true })
  @JoinColumn()
  exportTicket?: ExportTicketEntity | null;

  @Column({
    nullable: true,
    type: Number,
  })
  amount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  taxRate?: number | null;

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

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  product?: ProductEntity | null;

  @ManyToOne(() => OrderInvoiceEntity, { eager: true, nullable: true })
  orderInvoice?: OrderInvoiceEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
