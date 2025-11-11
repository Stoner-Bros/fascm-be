import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AreaAlert } from '../../domain/area-alert';

export abstract class AreaAlertRepository {
  abstract create(
    data: Omit<AreaAlert, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AreaAlert>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AreaAlert[]>;

  abstract findById(id: AreaAlert['id']): Promise<NullableType<AreaAlert>>;

  abstract findByIds(ids: AreaAlert['id'][]): Promise<AreaAlert[]>;

  abstract update(
    id: AreaAlert['id'],
    payload: DeepPartial<AreaAlert>,
  ): Promise<AreaAlert | null>;

  abstract remove(id: AreaAlert['id']): Promise<void>;
}
