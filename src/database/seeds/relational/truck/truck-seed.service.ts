import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TruckEntity } from '../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';
import { TruckStatusEnum } from '../../../../trucks/enum/truck-status.enum';
import { WarehouseEntity } from 'src/warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

@Injectable()
export class TruckSeedService {
  constructor(
    @InjectRepository(TruckEntity)
    private repository: Repository<TruckEntity>,
    @InjectRepository(WarehouseEntity)
    private warehouseRepository: Repository<WarehouseEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const warehouses = await this.warehouseRepository.find();
      const trucks = [
        {
          licensePlate: '30A-12345',
          model: 'Hyundai HD1000',
          capacity: 1000, // kg
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho trung tâm Hà Nội',
          licensePhoto: null,
          warehouse: warehouses[0],
        },
        {
          licensePlate: '29B-67890',
          model: 'Isuzu QKR77HE4',
          capacity: 750,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho trung tâm TP.HCM',
          licensePhoto: null,
          warehouse: warehouses[1],
        },
        {
          licensePlate: '43C-54321',
          model: 'Ford Transit',
          capacity: 2000,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho miền Trung',
          licensePhoto: null,
          warehouse: warehouses[0],
        },
        {
          licensePlate: '30A-98765',
          model: 'Thaco Ollin 700E',
          capacity: 500,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho phân phối Đông Anh',
          licensePhoto: null,
          warehouse: warehouses[0],
        },
        {
          licensePlate: '29B-13579',
          model: 'Hyundai EX8',
          capacity: 300,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho lạnh chuyên dụng',
          licensePhoto: null,
          warehouse: warehouses[1],
        },
        {
          licensePlate: '51F-24680',
          model: 'Mitsubishi Canter',
          capacity: 200,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Garage bảo dưỡng Hà Nội',
          licensePhoto: null,
          warehouse: warehouses[0],
        },
        {
          licensePlate: '30A-11111',
          model: 'Suzuki Pro 750kg',
          capacity: 200,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho trung tâm Hà Nội',
          licensePhoto: null,
          warehouse: warehouses[0],
        },
        {
          licensePlate: '29B-22222',
          model: 'Thaco Towner 800',
          capacity: 200,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho trung tâm TP.HCM',
          licensePhoto: null,
          warehouse: warehouses[1],
        },
        {
          licensePlate: '43C-33333',
          model: 'Dongfeng DFM 1.9T',
          capacity: 100,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho miền Trung',
          licensePhoto: null,
          warehouse: warehouses[0],
        },
        {
          licensePlate: '30A-44444',
          model: 'Hino 300 XZU720L',
          capacity: 300,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Đang vận chuyển tuyến Hà Nội - Hải Phòng',
          licensePhoto: null,
          warehouse: warehouses[0],
        },
      ];

      for (const truck of trucks) {
        await this.repository.save(this.repository.create(truck));
      }
    }
  }
}
