import { TruckEntity } from '../../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';

import { AreaEntity } from '../../../../../areas/infrastructure/persistence/relational/entities/area.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'io_t_device',
})
export class IoTDeviceEntity extends EntityRelationalHelper {
  @ManyToOne(() => TruckEntity, (parentEntity) => parentEntity.iotDevice, {
    eager: true,
    nullable: true,
  })
  truck: TruckEntity | null;

  @ManyToOne(() => AreaEntity, (parentEntity) => parentEntity.iotDevice, {
    eager: true,
    nullable: true,
  })
  area: AreaEntity | null;

  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  data?: string | null;

  @Column({
    nullable: true,
    type: Date,
  })
  lastDataTime?: Date | null;

  @Column({
    nullable: true,
    type: String,
  })
  type?: string | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await IoTDeviceEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `IOT_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
