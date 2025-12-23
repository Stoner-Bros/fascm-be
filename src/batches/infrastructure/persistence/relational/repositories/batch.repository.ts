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
    warehouseId,
    productId,
    paginationOptions,
  }: {
    areaId?: string;
    warehouseId?: string;
    productId?: string;
    paginationOptions: IPaginationOptions;
  }): Promise<BatchResponse[]> {
    const queryBuilder = this.batchRepository
      .createQueryBuilder('batch')
      .leftJoinAndSelect('batch.area', 'area')
      .leftJoinAndSelect('batch.product', 'product')
      .leftJoinAndSelect('batch.price', 'price')
      .leftJoinAndSelect('batch.importTicket', 'importTicket')
      .leftJoin(
        'inbound_batch',
        'inboundBatch',
        'inboundBatch.importTicketId = importTicket.id',
      )
      .leftJoin(
        'harvest_invoice_detail',
        'harvestInvoiceDetail',
        'harvestInvoiceDetail.id = inboundBatch.harvestInvoiceDetailId',
      )
      .leftJoin(
        'harvest_invoice',
        'harvestInvoice',
        'harvestInvoice.id = harvestInvoiceDetail.harvestInvoiceId',
      )
      .leftJoin(
        'harvest_phase',
        'harvestPhase',
        'harvestPhase.id = harvestInvoice.harvestPhaseId',
      )
      .leftJoin(
        'harvest_schedule',
        'harvestSchedule',
        'harvestSchedule.id = harvestPhase.harvestScheduleId',
      )
      .leftJoin(
        'supplier',
        'supplier',
        'supplier.id = harvestSchedule.supplierId',
      )
      .addSelect('supplier.gardenName', 'gardenName')
      .addSelect('inboundBatch.quantity', 'initQuantity')
      .addSelect('harvestSchedule.harvestDate', 'harvestDate');

    if (areaId) {
      queryBuilder.andWhere('area.id = :areaId', { areaId });
    }

    if (warehouseId) {
      queryBuilder.andWhere('area.warehouseId = :warehouseId', { warehouseId });
    }

    if (productId) {
      queryBuilder.andWhere('product.id = :productId', { productId });
    }

    queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const result = await queryBuilder.getRawAndEntities();

    return result.entities.map((entity, index) => {
      const response = BatchMapper.toResponse(entity);
      response.gardenName = result.raw[index]?.gardenName || null;
      response.harvestDate = result.raw[index]?.harvestDate || null;
      response.initQuantity = result.raw[index]?.initQuantity || null;
      return response;
    });
  }
}
