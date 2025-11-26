import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AreaAlertEntity } from '../entities/area-alert.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AreaAlert } from '../../../../domain/area-alert';
import { AreaAlertRepository } from '../../area-alert.repository';
import { AreaAlertMapper } from '../mappers/area-alert.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AreaAlertRelationalRepository implements AreaAlertRepository {
  constructor(
    @InjectRepository(AreaAlertEntity)
    private readonly areaAlertRepository: Repository<AreaAlertEntity>,
  ) {}

  async create(data: AreaAlert): Promise<AreaAlert> {
    const persistenceModel = AreaAlertMapper.toPersistence(data);
    const newEntity = await this.areaAlertRepository.save(
      this.areaAlertRepository.create(persistenceModel),
    );
    return AreaAlertMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AreaAlert[]> {
    const entities = await this.areaAlertRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AreaAlertMapper.toDomain(entity));
  }

  async findById(id: AreaAlert['id']): Promise<NullableType<AreaAlert>> {
    const entity = await this.areaAlertRepository.findOne({
      where: { id },
    });

    return entity ? AreaAlertMapper.toDomain(entity) : null;
  }

  async findByIds(ids: AreaAlert['id'][]): Promise<AreaAlert[]> {
    const entities = await this.areaAlertRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AreaAlertMapper.toDomain(entity));
  }

  async update(
    id: AreaAlert['id'],
    payload: Partial<AreaAlert>,
  ): Promise<AreaAlert> {
    const entity = await this.areaAlertRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.areaAlertRepository.save(
      this.areaAlertRepository.create(
        AreaAlertMapper.toPersistence({
          ...AreaAlertMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AreaAlertMapper.toDomain(updatedEntity);
  }

  async remove(id: AreaAlert['id']): Promise<void> {
    await this.areaAlertRepository.delete(id);
  }

  async findActiveAlertByAreaId(
    areaId: string,
  ): Promise<NullableType<AreaAlert>> {
    const entity = await this.areaAlertRepository.findOne({
      where: { area: { id: areaId } },
    });

    return entity ? AreaAlertMapper.toDomain(entity) : null;
  }
}
