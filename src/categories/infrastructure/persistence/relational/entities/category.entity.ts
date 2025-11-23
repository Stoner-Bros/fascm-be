import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  Column,
  BeforeInsert,
  PrimaryColumn,
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

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await CategoryEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `CAT_${String(next).padStart(4, '0')}`;
  }
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
