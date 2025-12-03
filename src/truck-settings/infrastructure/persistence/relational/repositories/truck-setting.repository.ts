import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TruckSettingEntity } from '../entities/truck-setting.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { TruckSetting } from '../../../../domain/truck-setting';
import { TruckSettingRepository } from '../../truck-setting.repository';
import { TruckSettingMapper } from '../mappers/truck-setting.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class TruckSettingRelationalRepository
  implements TruckSettingRepository
{
  constructor(
    @InjectRepository(TruckSettingEntity)
    private readonly truckSettingRepository: Repository<TruckSettingEntity>,
  ) {}

  async create(data: TruckSetting): Promise<TruckSetting> {
    const persistenceModel = TruckSettingMapper.toPersistence(data);
    const newEntity = await this.truckSettingRepository.save(
      this.truckSettingRepository.create(persistenceModel),
    );
    return TruckSettingMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<TruckSetting[]> {
    const entities = await this.truckSettingRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => TruckSettingMapper.toDomain(entity));
  }

  async findById(id: TruckSetting['id']): Promise<NullableType<TruckSetting>> {
    const entity = await this.truckSettingRepository.findOne({
      where: { id },
    });

    return entity ? TruckSettingMapper.toDomain(entity) : null;
  }

  async findByIds(ids: TruckSetting['id'][]): Promise<TruckSetting[]> {
    const entities = await this.truckSettingRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => TruckSettingMapper.toDomain(entity));
  }

  async update(
    id: TruckSetting['id'],
    payload: Partial<TruckSetting>,
  ): Promise<TruckSetting> {
    const entity = await this.truckSettingRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.truckSettingRepository.save(
      this.truckSettingRepository.create(
        TruckSettingMapper.toPersistence({
          ...TruckSettingMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TruckSettingMapper.toDomain(updatedEntity);
  }

  async remove(id: TruckSetting['id']): Promise<void> {
    await this.truckSettingRepository.delete(id);
  }

  async findByTruckId(truckId: string): Promise<NullableType<TruckSetting>> {
    const entity = await this.truckSettingRepository.findOne({
      where: { truck: { id: truckId } },
    });

    return entity ? TruckSettingMapper.toDomain(entity) : null;
  }
}
