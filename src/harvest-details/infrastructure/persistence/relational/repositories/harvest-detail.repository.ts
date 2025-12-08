import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HarvestDetailEntity } from '../entities/harvest-detail.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { HarvestDetail } from '../../../../domain/harvest-detail';
import { HarvestDetailRepository } from '../../harvest-detail.repository';
import { HarvestDetailMapper } from '../mappers/harvest-detail.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { HarvestDetailResponse } from '../../../../dto/harvest-detail-response.dto';

@Injectable()
export class HarvestDetailRelationalRepository
  implements HarvestDetailRepository
{
  constructor(
    @InjectRepository(HarvestDetailEntity)
    private readonly harvestDetailRepository: Repository<HarvestDetailEntity>,
  ) {}

  async create(data: HarvestDetail): Promise<HarvestDetailResponse> {
    const persistenceModel = HarvestDetailMapper.toPersistence(data);
    const newEntity = await this.harvestDetailRepository.save(
      this.harvestDetailRepository.create(persistenceModel),
    );
    return HarvestDetailMapper.toResponse(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestDetailResponse[]> {
    const entities = await this.harvestDetailRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => HarvestDetailMapper.toResponse(entity));
  }

  async findById(
    id: HarvestDetail['id'],
  ): Promise<NullableType<HarvestDetail>> {
    const entity = await this.harvestDetailRepository.findOne({
      where: { id },
    });

    return entity ? HarvestDetailMapper.toDomain(entity) : null;
  }

  async findByIds(ids: HarvestDetail['id'][]): Promise<HarvestDetail[]> {
    const entities = await this.harvestDetailRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => HarvestDetailMapper.toDomain(entity));
  }

  async findByHarvestTicketId(
    harvestTicketId: string,
  ): Promise<HarvestDetailResponse[]> {
    const entities = await this.harvestDetailRepository.find({
      where: { harvestTicket: { id: harvestTicketId } },
      relations: ['harvestTicket', 'product'],
    });

    return entities.map((entity) => HarvestDetailMapper.toResponse(entity));
  }

  async update(
    id: HarvestDetail['id'],
    payload: Partial<HarvestDetail>,
  ): Promise<HarvestDetail> {
    const entity = await this.harvestDetailRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.harvestDetailRepository.save(
      this.harvestDetailRepository.create(
        HarvestDetailMapper.toPersistence({
          ...HarvestDetailMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HarvestDetailMapper.toDomain(updatedEntity);
  }

  async remove(id: HarvestDetail['id']): Promise<void> {
    await this.harvestDetailRepository.delete(id);
  }
}
