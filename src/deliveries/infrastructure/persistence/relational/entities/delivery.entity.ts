import { TruckEntity } from '../../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';

import { DeliveryStaffEntity } from 'src/delivery-staffs/infrastructure/persistence/relational/entities/delivery-staff.entity';
import { HarvestPhaseEntity } from 'src/harvest-phases/infrastructure/persistence/relational/entities/harvest-phase.entity';
import { OrderPhaseEntity } from 'src/order-phases/infrastructure/persistence/relational/entities/order-phase.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { DeliveryStatusEnum } from '../../../../enum/delivery-status.enum';

@Entity({
  name: 'delivery',
})
export class DeliveryEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: 'double precision',
  })
  endLng?: number | null;

  @Column({
    nullable: true,
    type: 'double precision',
  })
  endLat?: number | null;

  @Column({
    nullable: true,
    type: 'double precision',
  })
  startLng?: number | null;

  @Column({
    nullable: true,
    type: 'double precision',
  })
  startLat?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  endAddress?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  startAddress?: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: DeliveryStatusEnum,
  })
  status?: DeliveryStatusEnum | null;

  @Column({
    nullable: true,
    type: Date,
  })
  endTime?: Date | null;

  @Column({
    nullable: true,
    type: Date,
  })
  startTime?: Date | null;

  @ManyToOne(() => DeliveryStaffEntity, { eager: true, nullable: true })
  deliveryStaff?: DeliveryStaffEntity | null;

  @ManyToOne(() => TruckEntity, { eager: true, nullable: true })
  truck?: TruckEntity | null;

  @ManyToOne(() => HarvestPhaseEntity, { eager: true, nullable: true })
  harvestPhase?: HarvestPhaseEntity | null;

  @ManyToOne(() => OrderPhaseEntity, { eager: true, nullable: true })
  orderPhase?: OrderPhaseEntity | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;
  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await DeliveryEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `DEL_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
