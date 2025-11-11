import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'category',
})
export class CategoryEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  englishName?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  vietnameseName?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
