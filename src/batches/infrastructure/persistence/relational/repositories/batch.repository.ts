import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BatchEntity } from '../entities/batch.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Batch } from '../../../../domain/batch';
import { BatchRepository } from '../../batch.repository';
import { BatchMapper } from '../mappers/batch.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class BatchRelationalRepository implements BatchRepository {
  constructor(
    @InjectRepository(BatchEntity)
    private readonly batchRepository: Repository<BatchEntity>,
  ) {}

  async create(data: Batch): Promise<Batch> {
    const persistenceModel = BatchMapper.toPersistence(data);
    const newEntity = await this.batchRepository.save(
      this.batchRepository.create(persistenceModel),
    );
    return BatchMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Batch[]> {
    const entities = await this.batchRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => BatchMapper.toDomain(entity));
  }

  async findById(id: Batch['id']): Promise<NullableType<Batch>> {
    const entity = await this.batchRepository.findOne({
      where: { id },
    });

    return entity ? BatchMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Batch['id'][]): Promise<Batch[]> {
    const entities = await this.batchRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => BatchMapper.toDomain(entity));
  }

  async update(id: Batch['id'], payload: Partial<Batch>): Promise<Batch> {
    const entity = await this.batchRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.batchRepository.save(
      this.batchRepository.create(
        BatchMapper.toPersistence({
          ...BatchMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return BatchMapper.toDomain(updatedEntity);
  }

  async remove(id: Batch['id']): Promise<void> {
    await this.batchRepository.delete(id);
  }
}
