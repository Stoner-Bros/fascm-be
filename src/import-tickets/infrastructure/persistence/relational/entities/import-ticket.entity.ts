import { InboundBatchEntity } from '../../../../../inbound-batches/infrastructure/persistence/relational/entities/inbound-batch.entity';

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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
