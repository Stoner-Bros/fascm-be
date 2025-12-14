import { ConsigneeEntity } from '../../../../../consignees/infrastructure/persistence/relational/entities/consignee.entity';
import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

import {
  DebtStatusEnum,
  DebtTypeEnum,
  PartnerTypeEnum,
} from 'src/debts/enum/debt.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'debt',
})
export class DebtEntity extends EntityRelationalHelper {
  @OneToOne(() => ConsigneeEntity, { eager: true, nullable: true })
  @JoinColumn()
  consignee?: ConsigneeEntity | null;

  @OneToOne(() => SupplierEntity, { eager: true, nullable: true })
  @JoinColumn()
  supplier?: SupplierEntity | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: PartnerTypeEnum,
  })
  partnerType?: PartnerTypeEnum | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: DebtStatusEnum,
  })
  status?: DebtStatusEnum | null;

  @Column({
    nullable: true,
    type: Date,
  })
  dueDate?: Date | null;

  @Column({
    nullable: true,
    type: Number,
  })
  creditLimit?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  remainingAmount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  paidAmount?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  originalAmount?: number | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: DebtTypeEnum,
  })
  debtType?: DebtTypeEnum | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
