import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ExportTicket } from '../../../../domain/export-ticket';
import { ExportTicketRepository } from '../../export-ticket.repository';
import { ExportTicketEntity } from '../entities/export-ticket.entity';
import { ExportTicketMapper } from '../mappers/export-ticket.mapper';

@Injectable()
export class ExportTicketRelationalRepository
  implements ExportTicketRepository
{
  constructor(
    @InjectRepository(ExportTicketEntity)
    private readonly exportTicketRepository: Repository<ExportTicketEntity>,
  ) {}

  async create(data: ExportTicket): Promise<ExportTicket> {
    const persistenceModel = ExportTicketMapper.toPersistence(data);
    const newEntity = await this.exportTicketRepository.save(
      this.exportTicketRepository.create(persistenceModel),
    );
    return ExportTicketMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExportTicket[]> {
    const queryBuilder = this.exportTicketRepository
      .createQueryBuilder('exportTicket')
      .leftJoin(
        'order_detail_selection',
        'ods',
        'ods.exportTicketId = exportTicket.id',
      )
      .leftJoin('batch', 'batch', 'batch.id = ods.batchId')
      .leftJoin('product', 'product', 'product.id = batch.productId')
      .leftJoin('area', 'area', 'area.id = batch.areaId')
      .select('exportTicket.id', 'id')
      .addSelect('exportTicket.unit', 'unit')
      .addSelect('exportTicket.quantity', 'quantity')
      .addSelect('exportTicket.exportDate', 'exportDate')
      .addSelect('exportTicket.createdAt', 'createdAt')
      .addSelect('exportTicket.updatedAt', 'updatedAt')
      .addSelect('product.name', 'productName')
      .addSelect('area.name', 'areaName')
      .groupBy('exportTicket.id')
      .addGroupBy('exportTicket.unit')
      .addGroupBy('exportTicket.quantity')
      .addGroupBy('exportTicket.exportDate')
      .addGroupBy('exportTicket.createdAt')
      .addGroupBy('exportTicket.updatedAt')
      .addGroupBy('product.name')
      .addGroupBy('area.name')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const entities = await queryBuilder.getRawMany();

    return entities.map((entity) => ({
      ...ExportTicketMapper.toDomain(entity),
      productName: entity.productName,
      areaName: entity.areaName,
    }));
  }

  async findById(id: ExportTicket['id']): Promise<NullableType<ExportTicket>> {
    const entity = await this.exportTicketRepository.findOne({
      where: { id },
    });

    return entity ? ExportTicketMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ExportTicket['id'][]): Promise<ExportTicket[]> {
    const entities = await this.exportTicketRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ExportTicketMapper.toDomain(entity));
  }

  async update(
    id: ExportTicket['id'],
    payload: Partial<ExportTicket>,
  ): Promise<ExportTicket> {
    const entity = await this.exportTicketRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.exportTicketRepository.save(
      this.exportTicketRepository.create(
        ExportTicketMapper.toPersistence({
          ...ExportTicketMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ExportTicketMapper.toDomain(updatedEntity);
  }

  async remove(id: ExportTicket['id']): Promise<void> {
    await this.exportTicketRepository.delete(id);
  }

  async findByAreaWithPagination({
    areaId,
    paginationOptions,
  }: {
    areaId: string;
    paginationOptions: IPaginationOptions;
  }): Promise<ExportTicket[]> {
    const queryBuilder = this.exportTicketRepository
      .createQueryBuilder('exportTicket')
      .leftJoin(
        'order_detail_selection',
        'ods',
        'ods.exportTicketId = exportTicket.id',
      )
      .leftJoin('batch', 'batch', 'batch.id = ods.batchId')
      .leftJoin('product', 'product', 'product.id = batch.productId')
      .leftJoin('area', 'area', 'area.id = batch.areaId')
      .where('area.id = :areaId', { areaId })
      .select('exportTicket.id', 'id')
      .addSelect('exportTicket.unit', 'unit')
      .addSelect('exportTicket.quantity', 'quantity')
      .addSelect('exportTicket.exportDate', 'exportDate')
      .addSelect('exportTicket.createdAt', 'createdAt')
      .addSelect('exportTicket.updatedAt', 'updatedAt')
      .addSelect('product.name', 'productName')
      .addSelect('area.name', 'areaName')
      .groupBy('exportTicket.id')
      .addGroupBy('exportTicket.unit')
      .addGroupBy('exportTicket.quantity')
      .addGroupBy('exportTicket.exportDate')
      .addGroupBy('exportTicket.createdAt')
      .addGroupBy('exportTicket.updatedAt')
      .addGroupBy('product.name')
      .addGroupBy('area.name')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const entities = await queryBuilder.getRawMany();

    return entities.map((entity) => ({
      ...ExportTicketMapper.toDomain(entity),
      productName: entity.productName,
      areaName: entity.areaName,
    }));
  }

  async findByWarehouseWithPagination({
    warehouseId,
    paginationOptions,
  }: {
    warehouseId: string;
    paginationOptions: IPaginationOptions;
  }): Promise<ExportTicket[]> {
    const queryBuilder = this.exportTicketRepository
      .createQueryBuilder('exportTicket')
      .leftJoin(
        'order_detail_selection',
        'ods',
        'ods.exportTicketId = exportTicket.id',
      )
      .leftJoin('batch', 'batch', 'batch.id = ods.batchId')
      .leftJoin('product', 'product', 'product.id = batch.productId')
      .leftJoin('area', 'area', 'area.id = batch.areaId')
      .where('area.warehouseId = :warehouseId', { warehouseId })
      .select('exportTicket.id', 'id')
      .addSelect('exportTicket.unit', 'unit')
      .addSelect('exportTicket.quantity', 'quantity')
      .addSelect('exportTicket.exportDate', 'exportDate')
      .addSelect('exportTicket.createdAt', 'createdAt')
      .addSelect('exportTicket.updatedAt', 'updatedAt')
      .addSelect('product.name', 'productName')
      .addSelect('area.name', 'areaName')
      .groupBy('exportTicket.id')
      .addGroupBy('exportTicket.unit')
      .addGroupBy('exportTicket.quantity')
      .addGroupBy('exportTicket.exportDate')
      .addGroupBy('exportTicket.createdAt')
      .addGroupBy('exportTicket.updatedAt')
      .addGroupBy('product.name')
      .addGroupBy('area.name')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const entities = await queryBuilder.getRawMany();

    return entities.map((entity) => ({
      ...ExportTicketMapper.toDomain(entity),
      productName: entity.productName,
      areaName: entity.areaName,
    }));
  }
}
