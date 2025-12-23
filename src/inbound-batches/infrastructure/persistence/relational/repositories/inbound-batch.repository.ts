import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/domain/product';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { InboundBatch } from '../../../../domain/inbound-batch';
import { InboundBatchRepository } from '../../inbound-batch.repository';
import { InboundBatchEntity } from '../entities/inbound-batch.entity';
import { InboundBatchMapper } from '../mappers/inbound-batch.mapper';

@Injectable()
export class InboundBatchRelationalRepository
  implements InboundBatchRepository
{
  constructor(
    @InjectRepository(InboundBatchEntity)
    private readonly inboundBatchRepository: Repository<InboundBatchEntity>,
  ) {}

  async create(data: InboundBatch): Promise<InboundBatch> {
    const persistenceModel = InboundBatchMapper.toPersistence(data);
    const newEntity = await this.inboundBatchRepository.save(
      this.inboundBatchRepository.create(persistenceModel),
    );
    return InboundBatchMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    warehouseId,
  }: {
    paginationOptions: IPaginationOptions;
    warehouseId?: string;
  }): Promise<InboundBatch[]> {
    const queryBuilder = this.inboundBatchRepository
      .createQueryBuilder('inboundBatch')
      .leftJoinAndSelect(
        'inboundBatch.harvestInvoiceDetail',
        'harvestInvoiceDetail',
      )
      .leftJoinAndSelect('harvestInvoiceDetail.product', 'product')
      .leftJoinAndSelect('inboundBatch.importTicket', 'importTicket')
      .leftJoin(
        'harvest_invoice',
        'harvestInvoice',
        '"harvestInvoice"."id" = "harvestInvoiceDetail"."harvestInvoiceId"',
      )
      .leftJoin(
        'harvest_phase',
        'harvestPhase',
        '"harvestPhase"."id" = "harvestInvoice"."harvestPhaseId"',
      )
      .leftJoin(
        'harvest_schedule',
        'harvestSchedule',
        '"harvestSchedule"."id" = "harvestPhase"."harvestScheduleId"',
      )
      .leftJoin(
        'supplier',
        'supplier',
        '"supplier"."id" = "harvestSchedule"."supplierId"',
      )
      .where('inboundBatch.importTicket IS NULL');

    if (warehouseId) {
      queryBuilder.andWhere('"supplier"."warehouseId" = :warehouseId', {
        warehouseId,
      });
    }

    queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const entities = await queryBuilder.getMany();

    return entities.map((entity) => InboundBatchMapper.toDomain(entity));
  }

  async findById(id: InboundBatch['id']): Promise<NullableType<InboundBatch>> {
    const entity = await this.inboundBatchRepository.findOne({
      where: { id },
    });

    return entity ? InboundBatchMapper.toDomain(entity) : null;
  }

  async findByIds(ids: InboundBatch['id'][]): Promise<InboundBatch[]> {
    const entities = await this.inboundBatchRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => InboundBatchMapper.toDomain(entity));
  }

  async update(
    id: InboundBatch['id'],
    payload: Partial<InboundBatch>,
  ): Promise<InboundBatch> {
    const entity = await this.inboundBatchRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.inboundBatchRepository.save(
      this.inboundBatchRepository.create(
        InboundBatchMapper.toPersistence({
          ...InboundBatchMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return InboundBatchMapper.toDomain(updatedEntity);
  }

  async remove(id: InboundBatch['id']): Promise<void> {
    await this.inboundBatchRepository.delete(id);
  }

  async getProductOfInboundBatch(
    inboundBatch: InboundBatch,
  ): Promise<NullableType<Product>> {
    const entity = await this.inboundBatchRepository.findOne({
      where: { id: inboundBatch.id },
      relations: ['harvestInvoiceDetail', 'harvestInvoiceDetail.product'],
    });

    if (
      !entity ||
      !entity.harvestInvoiceDetail ||
      !entity.harvestInvoiceDetail.product
    ) {
      return null;
    }

    return entity.harvestInvoiceDetail.product;
  }
}
