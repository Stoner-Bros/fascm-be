import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { HarvestSchedule } from '../../domain/harvest-schedule';

export abstract class HarvestScheduleRepository {
  abstract create(
    data: Omit<HarvestSchedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<HarvestSchedule>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestSchedule[]>;

  abstract findById(
    id: HarvestSchedule['id'],
  ): Promise<NullableType<HarvestSchedule>>;

  abstract findByIds(ids: HarvestSchedule['id'][]): Promise<HarvestSchedule[]>;

  abstract update(
    id: HarvestSchedule['id'],
    payload: DeepPartial<HarvestSchedule>,
  ): Promise<HarvestSchedule | null>;

  abstract remove(id: HarvestSchedule['id']): Promise<void>;
}
