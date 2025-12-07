import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HarvestPhaseEntity } from '../entities/harvest-phase.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { HarvestPhase } from '../../../../domain/harvest-phase';
import { HarvestPhaseRepository } from '../../harvest-phase.repository';
import { HarvestPhaseMapper } from '../mappers/harvest-phase.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class HarvestPhaseRelationalRepository
  implements HarvestPhaseRepository
{
  constructor(
    @InjectRepository(HarvestPhaseEntity)
    private readonly harvestPhaseRepository: Repository<HarvestPhaseEntity>,
  ) {}

  async create(data: HarvestPhase): Promise<HarvestPhase> {
    const persistenceModel = HarvestPhaseMapper.toPersistence(data);
    const newEntity = await this.harvestPhaseRepository.save(
      this.harvestPhaseRepository.create(persistenceModel),
    );
    return HarvestPhaseMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestPhase[]> {
    const entities = await this.harvestPhaseRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => HarvestPhaseMapper.toDomain(entity));
  }

  async findById(id: HarvestPhase['id']): Promise<NullableType<HarvestPhase>> {
    const entity = await this.harvestPhaseRepository.findOne({
      where: { id },
    });

    return entity ? HarvestPhaseMapper.toDomain(entity) : null;
  }

  async findByIds(ids: HarvestPhase['id'][]): Promise<HarvestPhase[]> {
    const entities = await this.harvestPhaseRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => HarvestPhaseMapper.toDomain(entity));
  }

  async update(
    id: HarvestPhase['id'],
    payload: Partial<HarvestPhase>,
  ): Promise<HarvestPhase> {
    const entity = await this.harvestPhaseRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.harvestPhaseRepository.save(
      this.harvestPhaseRepository.create(
        HarvestPhaseMapper.toPersistence({
          ...HarvestPhaseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HarvestPhaseMapper.toDomain(updatedEntity);
  }

  async remove(id: HarvestPhase['id']): Promise<void> {
    await this.harvestPhaseRepository.delete(id);
  }
}
