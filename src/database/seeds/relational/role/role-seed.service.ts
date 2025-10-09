import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { RoleEnum } from '../../../../roles/roles.enum';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.admin,
          name: 'Admin',
        }),
      );
    }

    const countManager = await this.repository.count({
      where: {
        id: RoleEnum.manager,
      },
    });

    if (!countManager) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.manager,
          name: 'Manager',
        }),
      );
    }

    const countStaff = await this.repository.count({
      where: {
        id: RoleEnum.staff,
      },
    });

    if (!countStaff) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.staff,
          name: 'Staff',
        }),
      );
    }

    const countDeliveryStaff = await this.repository.count({
      where: {
        id: RoleEnum.delivery_staff,
      },
    });

    if (!countDeliveryStaff) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.delivery_staff,
          name: 'Delivery Staff',
        }),
      );
    }

    const countConsignee = await this.repository.count({
      where: {
        id: RoleEnum.consignee,
      },
    });

    if (!countConsignee) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.consignee,
          name: 'Consignee',
        }),
      );
    }
  }
}
