import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TruckAlertEntity } from '../entities/truck-alert.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { TruckAlert } from '../../../../domain/truck-alert';
import { TruckAlertRepository } from '../../truck-alert.repository';
import { TruckAlertMapper } from '../mappers/truck-alert.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class TruckAlertRelationalRepository implements TruckAlertRepository {
  constructor(
    @InjectRepository(TruckAlertEntity)
    private readonly truckAlertRepository: Repository<TruckAlertEntity>,
  ) {}

  async create(data: TruckAlert): Promise<TruckAlert> {
    const persistenceModel = TruckAlertMapper.toPersistence(data);
    const newEntity = await this.truckAlertRepository.save(
      this.truckAlertRepository.create(persistenceModel),
    );
    return TruckAlertMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<TruckAlert[]> {
    const entities = await this.truckAlertRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => TruckAlertMapper.toDomain(entity));
  }

  async findById(id: TruckAlert['id']): Promise<NullableType<TruckAlert>> {
    const entity = await this.truckAlertRepository.findOne({
      where: { id },
    });

    return entity ? TruckAlertMapper.toDomain(entity) : null;
  }

  async findByIds(ids: TruckAlert['id'][]): Promise<TruckAlert[]> {
    const entities = await this.truckAlertRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => TruckAlertMapper.toDomain(entity));
  }

  async update(
    id: TruckAlert['id'],
    payload: Partial<TruckAlert>,
  ): Promise<TruckAlert> {
    const entity = await this.truckAlertRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.truckAlertRepository.save(
      this.truckAlertRepository.create(
        TruckAlertMapper.toPersistence({
          ...TruckAlertMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TruckAlertMapper.toDomain(updatedEntity);
  }

  async remove(id: TruckAlert['id']): Promise<void> {
    await this.truckAlertRepository.delete(id);
  }

  async findActiveAlertByTruckId(
    truckId: string,
  ): Promise<NullableType<TruckAlert>> {
    const entity = await this.truckAlertRepository.findOne({
      where: { truck: { id: truckId } },
    });

    return entity ? TruckAlertMapper.toDomain(entity) : null;
  }
}
