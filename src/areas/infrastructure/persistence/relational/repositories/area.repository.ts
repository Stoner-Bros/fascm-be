import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AreaEntity } from '../entities/area.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Area } from '../../../../domain/area';
import { AreaRepository } from '../../area.repository';
import { AreaMapper } from '../mappers/area.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AreaRelationalRepository implements AreaRepository {
  constructor(
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>,
  ) {}

  async create(data: Area): Promise<Area> {
    const persistenceModel = AreaMapper.toPersistence(data);
    const newEntity = await this.areaRepository.save(
      this.areaRepository.create(persistenceModel),
    );
    return AreaMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Area[]> {
    const entities = await this.areaRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AreaMapper.toDomain(entity));
  }

  async findById(id: Area['id']): Promise<NullableType<Area>> {
    const entity = await this.areaRepository.findOne({
      where: { id },
    });

    return entity ? AreaMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Area['id'][]): Promise<Area[]> {
    const entities = await this.areaRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AreaMapper.toDomain(entity));
  }

  async update(id: Area['id'], payload: Partial<Area>): Promise<Area> {
    const entity = await this.areaRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.areaRepository.save(
      this.areaRepository.create(
        AreaMapper.toPersistence({
          ...AreaMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AreaMapper.toDomain(updatedEntity);
  }

  async remove(id: Area['id']): Promise<void> {
    await this.areaRepository.delete(id);
  }
}
