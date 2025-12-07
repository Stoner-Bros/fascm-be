import { HarvestInvoiceDetailEntity } from 'src/harvest-invoice-details/infrastructure/persistence/relational/entities/harvest-invoice-detail.entity';
import { ImportTicketEntity } from 'src/import-tickets/infrastructure/persistence/relational/entities/import-ticket.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'inbound_batch',
})
export class InboundBatchEntity extends EntityRelationalHelper {
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

  @OneToOne(() => ImportTicketEntity, { eager: true, nullable: true })
  @JoinColumn()
  importTicket?: ImportTicketEntity | null;

  @OneToOne(() => HarvestInvoiceDetailEntity, { eager: true, nullable: true })
  @JoinColumn()
  harvestInvoiceDetail?: HarvestInvoiceDetailEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await InboundBatchEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `IB_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
