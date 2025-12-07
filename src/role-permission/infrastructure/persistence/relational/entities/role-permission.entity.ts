import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';
import { PermissionEntity } from 'src/permission/infrastructure/persistence/relational/entities/permission.entity';
import { FeatureEntity } from 'src/feature/infrastructure/persistence/relational/entities/feature.entity';

@Entity({
  name: 'role_permission',
})
export class RolePermissionEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  id: number;

  // many-to-one relationship with RoleEntity
  @ManyToOne(() => RoleEntity, { eager: true, nullable: true })
  role: RoleEntity | null;

  // many-to-one relationship with PermissionEntity
  @ManyToOne(() => PermissionEntity, { eager: true, nullable: true })
  permission: PermissionEntity | null;

  // many-to-one relationship with FeatureEntity
  @ManyToOne(() => FeatureEntity, { eager: true, nullable: true })
  feature: FeatureEntity | null;
}
