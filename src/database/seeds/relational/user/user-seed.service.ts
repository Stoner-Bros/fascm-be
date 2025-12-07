import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import bcrypt from 'bcryptjs';
import { ConsigneeEntity } from 'src/consignees/infrastructure/persistence/relational/entities/consignee.entity';
import { DeliveryStaffEntity } from 'src/delivery-staffs/infrastructure/persistence/relational/entities/delivery-staff.entity';
import { ManagerEntity } from 'src/managers/infrastructure/persistence/relational/entities/manager.entity';
import { StaffEntity } from 'src/staffs/infrastructure/persistence/relational/entities/staff.entity';
import { SupplierEntity } from 'src/suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import { WarehouseEntity } from 'src/warehouses/infrastructure/persistence/relational/entities/warehouse.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from '../../../../roles/roles.enum';
import { StatusEnum } from '../../../../statuses/statuses.enum';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    @InjectRepository(ManagerEntity)
    private managerRepo: Repository<ManagerEntity>,

    @InjectRepository(StaffEntity)
    private staffRepo: Repository<StaffEntity>,

    @InjectRepository(DeliveryStaffEntity)
    private dStaffRepo: Repository<DeliveryStaffEntity>,

    @InjectRepository(ConsigneeEntity)
    private consigneeRepo: Repository<ConsigneeEntity>,

    @InjectRepository(SupplierEntity)
    private supplierRepo: Repository<SupplierEntity>,

    @InjectRepository(WarehouseEntity)
    private warehouseRepo: Repository<WarehouseEntity>,
  ) {}

  async run() {
    const warehouses = await this.warehouseRepo.find();

    // 1. Admin User
    const countAdmin = await this.userRepo.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (!countAdmin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.userRepo.save(
        this.userRepo.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password,
          role: {
            id: RoleEnum.admin,
            name: 'Admin',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }

    // 2. Manager Users
    const countManager = await this.userRepo.count({
      where: {
        role: {
          id: RoleEnum.manager,
        },
      },
    });

    if (!countManager) {
      const managers = [
        {
          firstName: 'Nguyễn',
          lastName: 'Văn An',
          email: 'manager1@example.com',
          position: 'Quản lý kho Hà Nội',
          warehouse: warehouses[0],
        },
        {
          firstName: 'Trần',
          lastName: 'Thị Bình',
          email: 'manager2@example.com',
          position: 'Quản lý kho TP.HCM',
          warehouse: warehouses[1],
        },
        {
          firstName: 'Lê',
          lastName: 'Văn Cường',
          email: 'manager3@example.com',
          position: 'Quản lý kho miền Trung',
          warehouse: warehouses[2],
        },
      ];

      for (const managerData of managers) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash('secret', salt);

        const user = await this.userRepo.save(
          this.userRepo.create({
            firstName: managerData.firstName,
            lastName: managerData.lastName,
            email: managerData.email,
            password,
            role: {
              id: RoleEnum.manager,
              name: 'Manager',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        );

        await this.managerRepo.save(
          this.managerRepo.create({
            user: user,
            warehouse: managerData.warehouse,
          }),
        );
      }
    }

    // 3. Staff Users
    const countStaff = await this.userRepo.count({
      where: {
        role: {
          id: RoleEnum.staff,
        },
      },
    });

    if (!countStaff) {
      const staffs = [
        {
          firstName: 'Phạm',
          lastName: 'Văn Dũng',
          email: 'staff1@example.com',
          position: 'Nhân viên kho',
          warehouse: warehouses[0],
        },
        {
          firstName: 'Hoàng',
          lastName: 'Thị Em',
          email: 'staff2@example.com',
          position: 'Nhân viên kiểm định',
          warehouse: warehouses[0],
        },
        {
          firstName: 'Đặng',
          lastName: 'Văn Phúc',
          email: 'staff3@example.com',
          position: 'Nhân viên đóng gói',
          warehouse: warehouses[1],
        },
        {
          firstName: 'Võ',
          lastName: 'Thị Giang',
          email: 'staff4@example.com',
          position: 'Nhân viên sơ chế',
          warehouse: warehouses[1],
        },
        {
          firstName: 'Bùi',
          lastName: 'Văn Hải',
          email: 'staff5@example.com',
          position: 'Nhân viên thu hoạch',
          warehouse: warehouses[2],
        },
      ];

      for (const staffData of staffs) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash('secret', salt);

        const user = await this.userRepo.save(
          this.userRepo.create({
            firstName: staffData.firstName,
            lastName: staffData.lastName,
            email: staffData.email,
            password,
            role: {
              id: RoleEnum.staff,
              name: 'Staff',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        );

        await this.staffRepo.save(
          this.staffRepo.create({
            user: user,
            position: staffData.position,
            warehouse: staffData.warehouse,
          }),
        );
      }
    }

    // 4. Delivery Staff Users
    const countDeliveryStaff = await this.userRepo.count({
      where: {
        role: {
          id: RoleEnum.delivery_staff,
        },
      },
    });

    if (!countDeliveryStaff) {
      const deliveryStaffs = [
        {
          firstName: 'Ngô',
          lastName: 'Văn Khánh',
          email: 'deliverystaff1@example.com',
          warehouse: warehouses[0],
        },
        {
          firstName: 'Dương',
          lastName: 'Thị Loan',
          email: 'deliverystaff2@example.com',
          warehouse: warehouses[1],
        },
        {
          firstName: 'Lý',
          lastName: 'Văn Minh',
          email: 'deliverystaff3@example.com',
          warehouse: warehouses[2],
        },
        {
          firstName: 'Hồ',
          lastName: 'Thị Nga',
          email: 'deliverystaff4@example.com',
          warehouse: warehouses[3],
        },
      ];

      for (const dStaffData of deliveryStaffs) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash('secret', salt);

        const user = await this.userRepo.save(
          this.userRepo.create({
            firstName: dStaffData.firstName,
            lastName: dStaffData.lastName,
            email: dStaffData.email,
            password,
            role: {
              id: RoleEnum.delivery_staff,
              name: 'Delivery Staff',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        );

        await this.dStaffRepo.save(
          this.dStaffRepo.create({
            user: user,
            warehouse: dStaffData.warehouse,
          }),
        );
      }
    }

    // 5. Consignee Users
    const countConsignee = await this.userRepo.count({
      where: {
        role: {
          id: RoleEnum.consignee,
        },
      },
    });

    if (!countConsignee) {
      const consignees = [
        {
          firstName: 'Siêu thị',
          lastName: 'BigC',
          email: 'bigc@example.com',
        },
        {
          firstName: 'Cửa hàng',
          lastName: 'VinMart',
          email: 'vinmart@example.com',
        },
        {
          firstName: 'Nhà hàng',
          lastName: 'Golden Dragon',
          email: 'goldendragon@example.com',
        },
        {
          firstName: 'Chợ',
          lastName: 'Bến Thành',
          email: 'benthanh@example.com',
        },
        {
          firstName: 'Siêu thị',
          lastName: 'Lotte Mart',
          email: 'lottemart@example.com',
        },
      ];

      for (const consigneeData of consignees) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash('secret', salt);

        const user = await this.userRepo.save(
          this.userRepo.create({
            firstName: consigneeData.firstName,
            lastName: consigneeData.lastName,
            email: consigneeData.email,
            password,
            role: {
              id: RoleEnum.consignee,
              name: 'Consignee',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        );

        await this.consigneeRepo.save(
          this.consigneeRepo.create({
            user: user,
          }),
        );
      }
    }

    // 6. Supplier Users
    const countSupplier = await this.userRepo.count({
      where: {
        role: {
          id: RoleEnum.supplier,
        },
      },
    });

    if (!countSupplier) {
      const suppliers = [
        {
          firstName: 'Nông trường',
          lastName: 'Đà Lạt Organic',
          email: 'dalatorganic@example.com',
          warehouse: warehouses[0],
        },
        {
          firstName: 'HTX',
          lastName: 'Rau sạch Bình Dương',
          email: 'rausachbd@example.com',
          warehouse: warehouses[1],
        },
        {
          firstName: 'Trang trại',
          lastName: 'Green Farm',
          email: 'greenfarm@example.com',
          warehouse: warehouses[2],
        },
        {
          firstName: 'Công ty',
          lastName: 'TNHH Nông sản Sạch',
          email: 'nongsansach@example.com',
          warehouse: warehouses[3],
        },
        {
          firstName: 'Hợp tác xã',
          lastName: 'Rau Củ Quả Lâm Đồng',
          email: 'raucuqualamdong@example.com',
          warehouse: warehouses[4],
        },
        {
          firstName: 'Nông dân',
          lastName: 'Nguyễn Văn Tám',
          email: 'nguyenvantam@example.com',
          warehouse: warehouses[0],
        },
      ];

      for (const supplierData of suppliers) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash('secret', salt);

        const user = await this.userRepo.save(
          this.userRepo.create({
            firstName: supplierData.firstName,
            lastName: supplierData.lastName,
            email: supplierData.email,
            password,
            role: {
              id: RoleEnum.supplier,
              name: 'Supplier',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        );

        await this.supplierRepo.save(
          this.supplierRepo.create({
            user: user,
            gardenName: `${supplierData.lastName} Garden`,
            representativeName: `${supplierData.firstName} ${supplierData.lastName}`,
            warehouse: supplierData.warehouse,
          }),
        );
      }
    }
  }
}
