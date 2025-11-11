import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WarehouseEntity } from '../entities/warehouse.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Warehouse } from '../../../../domain/warehouse';
import { WarehouseRepository } from '../../warehouse.repository';
import { WarehouseMapper } from '../mappers/warehouse.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class WarehouseRelationalRepository implements WarehouseRepository {
  constructor(
    @InjectRepository(WarehouseEntity)
    private readonly warehouseRepository: Repository<WarehouseEntity>,
  ) {}

  async create(data: Warehouse): Promise<Warehouse> {
    const persistenceModel = WarehouseMapper.toPersistence(data);
    const newEntity = await this.warehouseRepository.save(
      this.warehouseRepository.create(persistenceModel),
    );
    return WarehouseMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Warehouse[]> {
    const entities = await this.warehouseRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => WarehouseMapper.toDomain(entity));
  }

  async findById(id: Warehouse['id']): Promise<NullableType<Warehouse>> {
    const entity = await this.warehouseRepository.findOne({
      where: { id },
    });

    return entity ? WarehouseMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Warehouse['id'][]): Promise<Warehouse[]> {
    const entities = await this.warehouseRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => WarehouseMapper.toDomain(entity));
  }

  async update(
    id: Warehouse['id'],
    payload: Partial<Warehouse>,
  ): Promise<Warehouse> {
    const entity = await this.warehouseRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.warehouseRepository.save(
      this.warehouseRepository.create(
        WarehouseMapper.toPersistence({
          ...WarehouseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WarehouseMapper.toDomain(updatedEntity);
  }

  async remove(id: Warehouse['id']): Promise<void> {
    await this.warehouseRepository.delete(id);
  }
}
