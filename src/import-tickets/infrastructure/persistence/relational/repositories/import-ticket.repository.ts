import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ImportTicketEntity } from '../entities/import-ticket.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ImportTicket } from '../../../../domain/import-ticket';
import { ImportTicketRepository } from '../../import-ticket.repository';
import { ImportTicketMapper } from '../mappers/import-ticket.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ImportTicketRelationalRepository
  implements ImportTicketRepository
{
  constructor(
    @InjectRepository(ImportTicketEntity)
    private readonly importTicketRepository: Repository<ImportTicketEntity>,
  ) {}

  async create(data: ImportTicket): Promise<ImportTicket> {
    const persistenceModel = ImportTicketMapper.toPersistence(data);
    const newEntity = await this.importTicketRepository.save(
      this.importTicketRepository.create(persistenceModel),
    );
    return ImportTicketMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ImportTicket[]> {
    const queryBuilder = this.importTicketRepository
      .createQueryBuilder('importTicket')
      .leftJoin(
        'inbound_batch',
        'inboundBatch',
        '"inboundBatch"."importTicketId" = "importTicket"."id"',
      )
      .leftJoin(
        'harvest_invoice_detail',
        'harvestInvoiceDetail',
        '"harvestInvoiceDetail"."id" = "inboundBatch"."harvestInvoiceDetailId"',
      )
      .leftJoin(
        'product',
        'product',
        '"product"."id" = "harvestInvoiceDetail"."productId"',
      )
      .leftJoin(
        '(' +
          'SELECT "batch"."importTicketId" as "importTicketId", ' +
          'COUNT("batch"."id") as "count", ' +
          'MAX("area"."name") as "areaName" ' +
          'FROM "batch" ' +
          'LEFT JOIN "area" ON "area"."id" = "batch"."areaId" ' +
          'GROUP BY "batch"."importTicketId"' +
          ')',
        'batchData',
        '"batchData"."importTicketId" = "importTicket"."id"',
      )
      .select([
        'importTicket.id',
        'importTicket.unit',
        'importTicket.quantity',
        'importTicket.percent',
        'importTicket.importDate',
        'importTicket.expiredAt',
        'importTicket.createdAt',
        'importTicket.updatedAt',
      ])
      .addSelect('"inboundBatch"."batchCode"', 'batchCode')
      .addSelect('"product"."name"', 'productName')
      .addSelect('COALESCE("batchData"."count", 0)', 'numberOfBatch')
      .addSelect('"batchData"."areaName"', 'areaName')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const rawResults = await queryBuilder.getRawAndEntities();

    return rawResults.entities.map((entity, index) => {
      const raw = rawResults.raw[index];
      return {
        ...ImportTicketMapper.toDomain(entity),
        batchCode: raw.batchCode,
        productName: raw.productName,
        numberOfBatch: parseInt(raw.numberOfBatch) || 0,
        areaName: raw.areaName,
      };
    });
  }

  async findById(id: ImportTicket['id']): Promise<NullableType<ImportTicket>> {
    const entity = await this.importTicketRepository.findOne({
      where: { id },
    });

    return entity ? ImportTicketMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ImportTicket['id'][]): Promise<ImportTicket[]> {
    const entities = await this.importTicketRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ImportTicketMapper.toDomain(entity));
  }

  async update(
    id: ImportTicket['id'],
    payload: Partial<ImportTicket>,
  ): Promise<ImportTicket> {
    const entity = await this.importTicketRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.importTicketRepository.save(
      this.importTicketRepository.create(
        ImportTicketMapper.toPersistence({
          ...ImportTicketMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ImportTicketMapper.toDomain(updatedEntity);
  }

  async remove(id: ImportTicket['id']): Promise<void> {
    await this.importTicketRepository.delete(id);
  }

  async findByAreaWithPagination({
    areaId,
    paginationOptions,
  }: {
    areaId: string;
    paginationOptions: IPaginationOptions;
  }): Promise<ImportTicket[]> {
    const queryBuilder = this.importTicketRepository
      .createQueryBuilder('importTicket')
      .leftJoin(
        'inbound_batch',
        'inboundBatch',
        '"inboundBatch"."importTicketId" = "importTicket"."id"',
      )
      .leftJoin(
        'harvest_invoice_detail',
        'harvestInvoiceDetail',
        '"harvestInvoiceDetail"."id" = "inboundBatch"."harvestInvoiceDetailId"',
      )
      .leftJoin(
        'product',
        'product',
        '"product"."id" = "harvestInvoiceDetail"."productId"',
      )
      .leftJoin(
        '(' +
          'SELECT "batch"."importTicketId" as "importTicketId", ' +
          'COUNT("batch"."id") as "count", ' +
          'MAX("area"."name") as "areaName" ' +
          'FROM "batch" ' +
          'LEFT JOIN "area" ON "area"."id" = "batch"."areaId" ' +
          'GROUP BY "batch"."importTicketId"' +
          ')',
        'batchData',
        '"batchData"."importTicketId" = "importTicket"."id"',
      )
      .where(
        'importTicket.id IN (SELECT DISTINCT "batch"."importTicketId" FROM "batch" WHERE "batch"."areaId" = :areaId)',
        { areaId },
      )
      .select([
        'importTicket.id',
        'importTicket.unit',
        'importTicket.quantity',
        'importTicket.percent',
        'importTicket.importDate',
        'importTicket.expiredAt',
        'importTicket.createdAt',
        'importTicket.updatedAt',
      ])
      .addSelect('"inboundBatch"."batchCode"', 'batchCode')
      .addSelect('"product"."name"', 'productName')
      .addSelect('COALESCE("batchData"."count", 0)', 'numberOfBatch')
      .addSelect('"batchData"."areaName"', 'areaName')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const rawResults = await queryBuilder.getRawAndEntities();

    return rawResults.entities.map((entity, index) => {
      const raw = rawResults.raw[index];
      return {
        ...ImportTicketMapper.toDomain(entity),
        batchCode: raw.batchCode,
        productName: raw.productName,
        numberOfBatch: parseInt(raw.numberOfBatch) || 0,
        areaName: raw.areaName,
      };
    });
  }
}
