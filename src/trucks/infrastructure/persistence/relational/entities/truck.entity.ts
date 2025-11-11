import { IoTDeviceEntity } from '../../../../../io-t-devices/infrastructure/persistence/relational/entities/io-t-device.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'truck',
})
export class TruckEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

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
    eager: true,
    nullable: true,
  })
  iotDevice?: IoTDeviceEntity[] | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
