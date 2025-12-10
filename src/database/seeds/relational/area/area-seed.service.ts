import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaEntity } from '../../../../areas/infrastructure/persistence/relational/entities/area.entity';
import { WarehouseEntity } from '../../../../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';

@Injectable()
export class AreaSeedService {
  constructor(
    @InjectRepository(AreaEntity)
    private areaRepository: Repository<AreaEntity>,
    @InjectRepository(WarehouseEntity)
    private warehouseRepository: Repository<WarehouseEntity>,
  ) {}

  async run() {
    const count = await this.areaRepository.count();

    if (!count) {
      const warehouses = await this.warehouseRepository.find();

      if (warehouses.length > 0) {
        const [warehouse1, warehouse2] = warehouses;

        await this.areaRepository.save([
          this.areaRepository.create({
            name: 'Khu vực chuối',
            description: 'Khu vực lưu trữ các loại chuối',
            location: 'Tầng 1, Phía Đông',
            unit: 'kg',
            quantity: 0,
            status: 'available',
            warehouse: warehouse1,
          }),
          this.areaRepository.create({
            name: 'Khu vực xoài',
            description: 'Khu vực lưu trữ các loại xoài',
            location: 'Tầng 1, Phía Tây',
            unit: 'kg',
            quantity: 0,
            status: 'available',
            warehouse: warehouse1,
          }),
          this.areaRepository.create({
            name: 'Khu vực chuối',
            description: 'Khu vực lưu trữ các loại chuối',
            location: 'Tầng 1, Phía Đông',
            unit: 'kg',
            quantity: 0,
            status: 'available',
            warehouse: warehouse2,
          }),
          this.areaRepository.create({
            name: 'Khu vực xoài',
            description: 'Khu vực lưu trữ các loại xoài',
            location: 'Tầng 1, Phía Tây',
            unit: 'kg',
            quantity: 0,
            status: 'available',
            warehouse: warehouse2,
          }),
        ]);
      }
    }
  }
}
