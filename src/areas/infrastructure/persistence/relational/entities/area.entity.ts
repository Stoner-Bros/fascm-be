import { IoTDeviceEntity } from '../../../../../io-t-devices/infrastructure/persistence/relational/entities/io-t-device.entity';

import { WarehouseEntity } from '../../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'area',
})
export class AreaEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  unit?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  quantity?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @OneToMany(() => IoTDeviceEntity, (childEntity) => childEntity.area, {
    eager: true,
    nullable: true,
  })
  iotDevice?: IoTDeviceEntity[] | null;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  location?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  name?: string | null;

  @ManyToOne(() => WarehouseEntity, { eager: true, nullable: true })
  warehouse?: WarehouseEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
