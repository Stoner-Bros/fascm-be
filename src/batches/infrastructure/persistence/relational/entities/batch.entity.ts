import { AreaEntity } from '../../../../../areas/infrastructure/persistence/relational/entities/area.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { ImportTicketEntity } from '../../../../../import-tickets/infrastructure/persistence/relational/entities/import-ticket.entity';

import { PriceEntity } from 'src/prices/infrastructure/persistence/relational/entities/price.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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
  costPrice?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  quantity?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  currentQuantity?: number | null;

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

  @Column({
    nullable: true,
    type: Date,
  })
  expiredAt?: Date | null;

  @OneToMany(() => PriceEntity, (childEntity) => childEntity.batch)
  price: PriceEntity[];

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
