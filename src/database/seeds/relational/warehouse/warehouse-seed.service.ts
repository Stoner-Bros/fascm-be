import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseEntity } from '../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

@Injectable()
export class WarehouseSeedService {
  constructor(
    @InjectRepository(WarehouseEntity)
    private repository: Repository<WarehouseEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          name: 'Kho trung tâm Hà Nội',
          address: '123 Đường Láng, Đống Đa, Hà Nội',
        }),
        this.repository.create({
          name: 'Kho trung tâm TP.HCM',
          address: '456 Nguyễn Văn Cừ, Quận 5, TP.HCM',
        }),
        this.repository.create({
          name: 'Kho miền Trung',
          address: '789 Lê Duẩn, Hải Châu, Đà Nẵng',
        }),
        this.repository.create({
          name: 'Kho phân phối Đông Anh',
          address: 'Km 25 Quốc Lộ 1A, Đông Anh, Hà Nội',
        }),
        this.repository.create({
          name: 'Kho lạnh chuyên dụng',
          address: '321 Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
        }),
      ]);
    }
  }
}
