import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetailSelectionEntity } from '../../../../../order-detail-selections/infrastructure/persistence/relational/entities/order-detail-selection.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'export_ticket',
})
export class ExportTicketEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  unit?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  quantity?: number | null;

  @Column({
    nullable: true,
    type: Date,
  })
  exportDate?: Date | null;

  @OneToMany(
    () => OrderDetailSelectionEntity,
    (orderDetailSelection) => orderDetailSelection.exportTicket,
  )
  orderDetailSelections?: OrderDetailSelectionEntity[];

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await ExportTicketEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `ET_${String(next).padStart(4, '0')}`;
  }
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
