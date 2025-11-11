import { TruckEntity } from '../../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';

import { AreaEntity } from '../../../../../areas/infrastructure/persistence/relational/entities/area.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'io_t_device',
})
export class IoTDeviceEntity extends EntityRelationalHelper {
  @ManyToOne(() => TruckEntity, (parentEntity) => parentEntity.iotDevice, {
    eager: false,
    nullable: false,
  })
  truck: TruckEntity;

  @ManyToOne(() => AreaEntity, (parentEntity) => parentEntity.iotDevice, {
    eager: false,
    nullable: false,
  })
  area: AreaEntity;

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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
