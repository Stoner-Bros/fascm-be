import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchResponse } from 'src/batches/dto/batch-response.dto';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Batch } from '../../../../domain/batch';
import { BatchRepository } from '../../batch.repository';
import { BatchEntity } from '../entities/batch.entity';
import { BatchMapper } from '../mappers/batch.mapper';

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

  async findByFiltersWithPagination({
    areaId,
    productId,
    paginationOptions,
  }: {
    areaId?: string;
    productId?: string;
    paginationOptions: IPaginationOptions;
  }): Promise<BatchResponse[]> {
    const queryBuilder = this.batchRepository
      .createQueryBuilder('batch')
      .leftJoinAndSelect('batch.area', 'area')
      .leftJoinAndSelect('batch.product', 'product');

    if (areaId) {
      queryBuilder.andWhere('area.id = :areaId', { areaId });
    }

    if (productId) {
      queryBuilder.andWhere('product.id = :productId', { productId });
    }

    queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const entities = await queryBuilder.getMany();
    return entities.map((entity) => BatchMapper.toResponse(entity));
  }

  async findByFiltersGroupedByImportTicket({
    areaId,
    importTicketId,
    productId,
  }: {
    areaId?: string;
    importTicketId?: string;
    productId?: string;
  }): Promise<BatchResponse[]> {
    const queryBuilder = this.batchRepository
      .createQueryBuilder('batch')
      .leftJoinAndSelect('batch.area', 'area')
      .leftJoinAndSelect('batch.product', 'product')
      .leftJoinAndSelect('batch.importTicket', 'importTicket');

    // if batch.exportTicketId is not null, then do not response the batch
    queryBuilder.andWhere('batch.exportTicketId IS NULL');

    if (areaId) {
      queryBuilder.andWhere('area.id = :areaId', { areaId });
    }

    if (importTicketId) {
      queryBuilder.andWhere('importTicket.id = :importTicketId', {
        importTicketId,
      });
    }

    if (productId) {
      queryBuilder.andWhere('product.id = :productId', { productId });
    }

    queryBuilder.orderBy('importTicket.importDate', 'DESC');

    const entities = await queryBuilder.getMany();
    return entities.map((entity) => BatchMapper.toResponse(entity));
  }
}
