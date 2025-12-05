import { IoTDeviceEntity } from '../../../../../io-t-devices/infrastructure/persistence/relational/entities/io-t-device.entity';

import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
  Column,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { TruckStatusEnum } from '../../../../enum/truck-status.enum';

@Entity({
  name: 'truck',
})
export class TruckEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: 'enum',
    enum: TruckStatusEnum,
  })
  status?: TruckStatusEnum | null;

  @Column({
    nullable: true,
    type: String,
  })
  currentLocation?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  model?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  licensePhoto?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  licensePlate?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  capacity?: number | null;

  @OneToMany(() => IoTDeviceEntity, (childEntity) => childEntity.truck, {
    eager: false,
    nullable: true,
  })
  iotDevice?: IoTDeviceEntity[] | null;

  @PrimaryColumn({
    type: String,
  })
  id: string;

  @BeforeInsert()
  async generateId() {
    if (this.id) return;
    const last = await TruckEntity.createQueryBuilder('c')
      .orderBy('c.id', 'DESC')
      .getOne();
    const next = last ? Number((last.id ?? '').split('_')[1] ?? 0) + 1 : 1;
    this.id = `TR_${String(next).padStart(4, '0')}`;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
