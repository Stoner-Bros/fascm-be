import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TruckEntity } from '../../../../trucks/infrastructure/persistence/relational/entities/truck.entity';
import { TruckStatusEnum } from '../../../../trucks/enum/truck-status.enum';

@Injectable()
export class TruckSeedService {
  constructor(
    @InjectRepository(TruckEntity)
    private repository: Repository<TruckEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const trucks = [
        {
          licensePlate: '30A-12345',
          model: 'Hyundai HD1000',
          capacity: 10000, // kg
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho trung tâm Hà Nội',
          licensePhoto: null,
        },
        {
          licensePlate: '29B-67890',
          model: 'Isuzu QKR77HE4',
          capacity: 7500,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho trung tâm TP.HCM',
          licensePhoto: null,
        },
        {
          licensePlate: '43C-54321',
          model: 'Ford Transit',
          capacity: 3500,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho miền Trung',
          licensePhoto: null,
        },
        {
          licensePlate: '30A-98765',
          model: 'Thaco Ollin 700E',
          capacity: 8500,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho phân phối Đông Anh',
          licensePhoto: null,
        },
        {
          licensePlate: '29B-13579',
          model: 'Hyundai EX8',
          capacity: 8000,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho lạnh chuyên dụng',
          licensePhoto: null,
        },
        {
          licensePlate: '51F-24680',
          model: 'Mitsubishi Canter',
          capacity: 5000,
          status: TruckStatusEnum.MAINTENANCE,
          currentLocation: 'Garage bảo dưỡng Hà Nội',
          licensePhoto: null,
        },
        {
          licensePlate: '30A-11111',
          model: 'Suzuki Pro 750kg',
          capacity: 750,
          status: TruckStatusEnum.AVAILABLE,
          currentLocation: 'Kho trung tâm Hà Nội',
          licensePhoto: null,
        },
        {
          licensePlate: '29B-22222',
          model: 'Thaco Towner 800',
          capacity: 800,
          status: TruckStatusEnum.IN_USE,
          currentLocation: 'Kho trung tâm TP.HCM',
          licensePhoto: null,
        },
        {
          licensePlate: '43C-33333',
          model: 'Dongfeng DFM 1.9T',
          capacity: 1900,
          status: TruckStatusEnum.IN_USE,
          currentLocation: 'Kho miền Trung',
          licensePhoto: null,
        },
        {
          licensePlate: '30A-44444',
          model: 'Hino 300 XZU720L',
          capacity: 4500,
          status: TruckStatusEnum.IN_USE,
          currentLocation: 'Đang vận chuyển tuyến Hà Nội - Hải Phòng',
          licensePhoto: null,
        },
      ];

      for (const truck of trucks) {
        await this.repository.save(this.repository.create(truck));
      }
    }
  }
}
