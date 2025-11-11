import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HarvestScheduleEntity } from '../entities/harvest-schedule.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { HarvestSchedule } from '../../../../domain/harvest-schedule';
import { HarvestScheduleRepository } from '../../harvest-schedule.repository';
import { HarvestScheduleMapper } from '../mappers/harvest-schedule.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class HarvestScheduleRelationalRepository
  implements HarvestScheduleRepository
{
  constructor(
    @InjectRepository(HarvestScheduleEntity)
    private readonly harvestScheduleRepository: Repository<HarvestScheduleEntity>,
  ) {}

  async create(data: HarvestSchedule): Promise<HarvestSchedule> {
    const persistenceModel = HarvestScheduleMapper.toPersistence(data);
    const newEntity = await this.harvestScheduleRepository.save(
      this.harvestScheduleRepository.create(persistenceModel),
    );
    return HarvestScheduleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestSchedule[]> {
    const entities = await this.harvestScheduleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => HarvestScheduleMapper.toDomain(entity));
  }

  async findById(
    id: HarvestSchedule['id'],
  ): Promise<NullableType<HarvestSchedule>> {
    const entity = await this.harvestScheduleRepository.findOne({
      where: { id },
    });

    return entity ? HarvestScheduleMapper.toDomain(entity) : null;
  }

  async findByIds(ids: HarvestSchedule['id'][]): Promise<HarvestSchedule[]> {
    const entities = await this.harvestScheduleRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => HarvestScheduleMapper.toDomain(entity));
  }

  async update(
    id: HarvestSchedule['id'],
    payload: Partial<HarvestSchedule>,
  ): Promise<HarvestSchedule> {
    const entity = await this.harvestScheduleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.harvestScheduleRepository.save(
      this.harvestScheduleRepository.create(
        HarvestScheduleMapper.toPersistence({
          ...HarvestScheduleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HarvestScheduleMapper.toDomain(updatedEntity);
  }

  async remove(id: HarvestSchedule['id']): Promise<void> {
    await this.harvestScheduleRepository.delete(id);
  }
}
