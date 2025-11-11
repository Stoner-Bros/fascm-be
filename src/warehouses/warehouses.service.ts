import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseRepository } from './infrastructure/persistence/warehouse.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Warehouse } from './domain/warehouse';

@Injectable()
export class WarehousesService {
  constructor(
    // Dependencies here
    private readonly warehouseRepository: WarehouseRepository,
  ) {}

  async create(createWarehouseDto: CreateWarehouseDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.warehouseRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      address: createWarehouseDto.address,

      name: createWarehouseDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.warehouseRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Warehouse['id']) {
    return this.warehouseRepository.findById(id);
  }

  findByIds(ids: Warehouse['id'][]) {
    return this.warehouseRepository.findByIds(ids);
  }

  async update(
    id: Warehouse['id'],

    updateWarehouseDto: UpdateWarehouseDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.warehouseRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      address: updateWarehouseDto.address,

      name: updateWarehouseDto.name,
    });
  }

  remove(id: Warehouse['id']) {
    return this.warehouseRepository.remove(id);
  }
}
