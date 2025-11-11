import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { HarvestTicketEntity } from '../../../../../harvest-tickets/infrastructure/persistence/relational/entities/harvest-ticket.entity';

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
  name: 'harvest_detail',
})
export class HarvestDetailEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  taxRate?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  amount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  unitPrice?: number | null;

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

  @ManyToOne(() => HarvestTicketEntity, { eager: true, nullable: true })
  harvestTicket?: HarvestTicketEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
