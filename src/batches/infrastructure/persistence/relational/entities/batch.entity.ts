import { AreaEntity } from '../../../../../areas/infrastructure/persistence/relational/entities/area.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { ImportTicketEntity } from '../../../../../import-tickets/infrastructure/persistence/relational/entities/import-ticket.entity';

import { ExportTicketEntity } from 'src/export-tickets/infrastructure/persistence/relational/entities/export-ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'batch',
})
export class BatchEntity extends EntityRelationalHelper {
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

  @ManyToOne(() => ExportTicketEntity, { eager: true, nullable: true })
  exportTicket?: ExportTicketEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
