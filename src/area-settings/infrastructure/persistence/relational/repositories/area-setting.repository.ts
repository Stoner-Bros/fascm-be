import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AreaSettingEntity } from '../entities/area-setting.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AreaSetting } from '../../../../domain/area-setting';
import { AreaSettingRepository } from '../../area-setting.repository';
import { AreaSettingMapper } from '../mappers/area-setting.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AreaSettingRelationalRepository implements AreaSettingRepository {
  constructor(
    @InjectRepository(AreaSettingEntity)
    private readonly areaSettingRepository: Repository<AreaSettingEntity>,
  ) {}

  async create(data: AreaSetting): Promise<AreaSetting> {
    const persistenceModel = AreaSettingMapper.toPersistence(data);
    const newEntity = await this.areaSettingRepository.save(
      this.areaSettingRepository.create(persistenceModel),
    );
    return AreaSettingMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AreaSetting[]> {
    const entities = await this.areaSettingRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AreaSettingMapper.toDomain(entity));
  }

  async findById(id: AreaSetting['id']): Promise<NullableType<AreaSetting>> {
    const entity = await this.areaSettingRepository.findOne({
      where: { id },
    });

    return entity ? AreaSettingMapper.toDomain(entity) : null;
  }

  async findByIds(ids: AreaSetting['id'][]): Promise<AreaSetting[]> {
    const entities = await this.areaSettingRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AreaSettingMapper.toDomain(entity));
  }

  async update(
    id: AreaSetting['id'],
    payload: Partial<AreaSetting>,
  ): Promise<AreaSetting> {
    const entity = await this.areaSettingRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.areaSettingRepository.save(
      this.areaSettingRepository.create(
        AreaSettingMapper.toPersistence({
          ...AreaSettingMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AreaSettingMapper.toDomain(updatedEntity);
  }

  async remove(id: AreaSetting['id']): Promise<void> {
    await this.areaSettingRepository.delete(id);
  }
}
