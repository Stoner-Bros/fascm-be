import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { HarvestSchedule } from '../../domain/harvest-schedule';
import { HarvestScheduleStatusEnum } from '../../enum/harvest-schedule-status.enum';

export abstract class HarvestScheduleRepository {
  abstract create(
    data: Omit<HarvestSchedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<HarvestSchedule>;

  abstract findAllWithPagination({
    paginationOptions,
    filters,
    sort,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { status?: HarvestScheduleStatusEnum };
    sort?: 'ASC' | 'DESC';
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

  abstract cancel(id: HarvestSchedule['id']): Promise<HarvestSchedule | null>;

  abstract complete(id: HarvestSchedule['id']): Promise<HarvestSchedule | null>;

  abstract confirm(
    id: HarvestSchedule['id'],
    status: HarvestScheduleStatusEnum,
    reason?: string,
  ): Promise<HarvestSchedule | null>;
}
