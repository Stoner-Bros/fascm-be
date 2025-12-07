import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HarvestInvoiceEntity } from '../entities/harvest-invoice.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { HarvestInvoice } from '../../../../domain/harvest-invoice';
import { HarvestInvoiceRepository } from '../../harvest-invoice.repository';
import { HarvestInvoiceMapper } from '../mappers/harvest-invoice.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class HarvestInvoiceRelationalRepository
  implements HarvestInvoiceRepository
{
  constructor(
    @InjectRepository(HarvestInvoiceEntity)
    private readonly harvestInvoiceRepository: Repository<HarvestInvoiceEntity>,
  ) {}

  async create(data: HarvestInvoice): Promise<HarvestInvoice> {
    const persistenceModel = HarvestInvoiceMapper.toPersistence(data);
    const newEntity = await this.harvestInvoiceRepository.save(
      this.harvestInvoiceRepository.create(persistenceModel),
    );
    return HarvestInvoiceMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestInvoice[]> {
    const entities = await this.harvestInvoiceRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => HarvestInvoiceMapper.toDomain(entity));
  }

  async findById(
    id: HarvestInvoice['id'],
  ): Promise<NullableType<HarvestInvoice>> {
    const entity = await this.harvestInvoiceRepository.findOne({
      where: { id },
    });

    return entity ? HarvestInvoiceMapper.toDomain(entity) : null;
  }

  async findByIds(ids: HarvestInvoice['id'][]): Promise<HarvestInvoice[]> {
    const entities = await this.harvestInvoiceRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => HarvestInvoiceMapper.toDomain(entity));
  }

  async update(
    id: HarvestInvoice['id'],
    payload: Partial<HarvestInvoice>,
  ): Promise<HarvestInvoice> {
    const entity = await this.harvestInvoiceRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.harvestInvoiceRepository.save(
      this.harvestInvoiceRepository.create(
        HarvestInvoiceMapper.toPersistence({
          ...HarvestInvoiceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HarvestInvoiceMapper.toDomain(updatedEntity);
  }

  async remove(id: HarvestInvoice['id']): Promise<void> {
    await this.harvestInvoiceRepository.delete(id);
  }
}
