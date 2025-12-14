import { BatchEntity } from 'src/batches/infrastructure/persistence/relational/entities/batch.entity';
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
  name: 'price',
})
export class PriceEntity extends EntityRelationalHelper {
  // Relation with BatchEntity
  @ManyToOne(() => BatchEntity, {
    eager: true,
    nullable: true,
  })
  batch?: BatchEntity | null;

  @Column({
    nullable: true,
    type: Number,
  })
  price?: number | null;

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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
