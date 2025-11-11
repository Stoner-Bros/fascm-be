import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TruckEntity } from '../entities/truck.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Truck } from '../../../../domain/truck';
import { TruckRepository } from '../../truck.repository';
import { TruckMapper } from '../mappers/truck.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class TruckRelationalRepository implements TruckRepository {
  constructor(
    @InjectRepository(TruckEntity)
    private readonly truckRepository: Repository<TruckEntity>,
  ) {}

  async create(data: Truck): Promise<Truck> {
    const persistenceModel = TruckMapper.toPersistence(data);
    const newEntity = await this.truckRepository.save(
      this.truckRepository.create(persistenceModel),
    );
    return TruckMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Truck[]> {
    const entities = await this.truckRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => TruckMapper.toDomain(entity));
  }

  async findById(id: Truck['id']): Promise<NullableType<Truck>> {
    const entity = await this.truckRepository.findOne({
      where: { id },
    });

    return entity ? TruckMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Truck['id'][]): Promise<Truck[]> {
    const entities = await this.truckRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => TruckMapper.toDomain(entity));
  }

  async update(id: Truck['id'], payload: Partial<Truck>): Promise<Truck> {
    const entity = await this.truckRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.truckRepository.save(
      this.truckRepository.create(
        TruckMapper.toPersistence({
          ...TruckMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TruckMapper.toDomain(updatedEntity);
  }

  async remove(id: Truck['id']): Promise<void> {
    await this.truckRepository.delete(id);
  }
}
