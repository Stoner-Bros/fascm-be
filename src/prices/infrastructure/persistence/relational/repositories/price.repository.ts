import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Price } from '../../../../domain/price';
import { PriceRepository } from '../../price.repository';
import { PriceEntity } from '../entities/price.entity';
import { PriceMapper } from '../mappers/price.mapper';

@Injectable()
export class PriceRelationalRepository implements PriceRepository {
  constructor(
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
  ) {}

  async create(data: Price): Promise<Price> {
    const persistenceModel = PriceMapper.toPersistence(data);
    const newEntity = await this.priceRepository.save(
      this.priceRepository.create(persistenceModel),
    );
    return PriceMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Price[]> {
    const entities = await this.priceRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PriceMapper.toDomain(entity));
  }

  async findById(id: Price['id']): Promise<NullableType<Price>> {
    const entity = await this.priceRepository.findOne({
      where: { id },
    });

    return entity ? PriceMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Price['id'][]): Promise<Price[]> {
    const entities = await this.priceRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PriceMapper.toDomain(entity));
  }

  async update(id: Price['id'], payload: Partial<Price>): Promise<Price> {
    const entity = await this.priceRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.priceRepository.save(
      this.priceRepository.create(
        PriceMapper.toPersistence({
          ...PriceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PriceMapper.toDomain(updatedEntity);
  }

  async remove(id: Price['id']): Promise<void> {
    await this.priceRepository.delete(id);
  }

  async findByBatchId(batchId: string): Promise<Price[]> {
    const entities = await this.priceRepository.find({
      where: { batch: { id: batchId } },
      relations: ['batch'],
    });

    return entities.map((entity) => PriceMapper.toDomain(entity));
  }
}
