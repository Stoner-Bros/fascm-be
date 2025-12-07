import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { HarvestInvoiceDetail } from '../../../../domain/harvest-invoice-detail';
import { HarvestInvoiceDetailRepository } from '../../harvest-invoice-detail.repository';
import { HarvestInvoiceDetailEntity } from '../entities/harvest-invoice-detail.entity';
import { HarvestInvoiceDetailMapper } from '../mappers/harvest-invoice-detail.mapper';

@Injectable()
export class HarvestInvoiceDetailRelationalRepository
  implements HarvestInvoiceDetailRepository
{
  constructor(
    @InjectRepository(HarvestInvoiceDetailEntity)
    private readonly harvestInvoiceDetailRepository: Repository<HarvestInvoiceDetailEntity>,
  ) {}

  async create(data: HarvestInvoiceDetail): Promise<HarvestInvoiceDetail> {
    const persistenceModel = HarvestInvoiceDetailMapper.toPersistence(data);
    const newEntity = await this.harvestInvoiceDetailRepository.save(
      this.harvestInvoiceDetailRepository.create(persistenceModel),
    );
    return HarvestInvoiceDetailMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestInvoiceDetail[]> {
    const entities = await this.harvestInvoiceDetailRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) =>
      HarvestInvoiceDetailMapper.toDomain(entity),
    );
  }

  async findById(
    id: HarvestInvoiceDetail['id'],
  ): Promise<NullableType<HarvestInvoiceDetail>> {
    const entity = await this.harvestInvoiceDetailRepository.findOne({
      where: { id },
    });

    return entity ? HarvestInvoiceDetailMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: HarvestInvoiceDetail['id'][],
  ): Promise<HarvestInvoiceDetail[]> {
    const entities = await this.harvestInvoiceDetailRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      HarvestInvoiceDetailMapper.toDomain(entity),
    );
  }

  async update(
    id: HarvestInvoiceDetail['id'],
    payload: Partial<HarvestInvoiceDetail>,
  ): Promise<HarvestInvoiceDetail> {
    const entity = await this.harvestInvoiceDetailRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.harvestInvoiceDetailRepository.save(
      this.harvestInvoiceDetailRepository.create(
        HarvestInvoiceDetailMapper.toPersistence({
          ...HarvestInvoiceDetailMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HarvestInvoiceDetailMapper.toDomain(updatedEntity);
  }

  async remove(id: HarvestInvoiceDetail['id']): Promise<void> {
    await this.harvestInvoiceDetailRepository.delete(id);
  }

  async findByHarvestInvoiceId(
    harvestInvoiceId: HarvestInvoiceDetail['id'],
  ): Promise<HarvestInvoiceDetail[]> {
    const entities = await this.harvestInvoiceDetailRepository.find({
      where: { harvestInvoice: { id: harvestInvoiceId } },
    });

    return entities.map((entity) =>
      HarvestInvoiceDetailMapper.toDomain(entity),
    );
  }
}
