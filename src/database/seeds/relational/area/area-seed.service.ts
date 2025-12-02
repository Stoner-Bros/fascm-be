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
        const [warehouse1, warehouse2, warehouse3] = warehouses;

        await this.areaRepository.save([
          this.areaRepository.create({
            name: 'Khu vực A1',
            description: 'Khu vực lưu trữ rau lá xanh',
            location: 'Tầng 1, Phía Đông',
            capacity: 500,
            availableCapacity: 500,
            warehouse: warehouse1,
          }),
          this.areaRepository.create({
            name: 'Khu vực A2',
            description: 'Khu vực lưu trữ củ quả',
            location: 'Tầng 1, Phía Tây',
            capacity: 750,
            availableCapacity: 750,
            warehouse: warehouse1,
          }),
          this.areaRepository.create({
            name: 'Khu vực B1',
            description: 'Khu vực lưu trữ trái cây nhiệt đới',
            location: 'Tầng 2, Khu A',
            capacity: 600,
            availableCapacity: 600,
            warehouse: warehouse2,
          }),
          this.areaRepository.create({
            name: 'Khu vực B2',
            description: 'Khu vực lưu trữ trái cây ôn đới',
            location: 'Tầng 2, Khu B',
            capacity: 800,
            availableCapacity: 800,
            warehouse: warehouse2,
          }),
          this.areaRepository.create({
            name: 'Khu vực C1',
            description: 'Khu vực lưu trữ lạnh',
            location: 'Tầng hầm, Khu lạnh',
            capacity: 400,
            availableCapacity: 400,
            warehouse: warehouse3,
          }),
          this.areaRepository.create({
            name: 'Khu vực D1',
            description: 'Khu vực sơ chế',
            location: 'Tầng 1, Khu sơ chế',
            capacity: 300,
            availableCapacity: 300,
            warehouse: warehouse1,
          }),
          this.areaRepository.create({
            name: 'Khu vực E1',
            description: 'Khu vực đóng gói',
            location: 'Tầng 1, Khu đóng gói',
            capacity: 200,
            availableCapacity: 200,
            warehouse: warehouse2,
          }),
          this.areaRepository.create({
            name: 'Khu vực F1',
            description: 'Khu vực kiểm định chất lượng',
            location: 'Tầng 2, Phòng lab',
            capacity: 150,
            availableCapacity: 150,
            warehouse: warehouse3,
          }),
        ]);
      }
    }
  }
}
