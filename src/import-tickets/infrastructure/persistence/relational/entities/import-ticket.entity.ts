import { InboundBatchEntity } from '../../../../../inbound-batches/infrastructure/persistence/relational/entities/inbound-batch.entity';

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
  name: 'import_ticket',
})
export class ImportTicketEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  numberOfBatch?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  percent?: number | null;

  @Column({
    nullable: true,
    type: Date,
  })
  importDate?: Date | null;

  @OneToOne(() => InboundBatchEntity, { eager: true, nullable: true })
  @JoinColumn()
  inboundBatch?: InboundBatchEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await ImportTicketEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `IT_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
