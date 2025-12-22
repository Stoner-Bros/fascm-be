import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Area } from '../../domain/area';

export abstract class AreaRepository {
  abstract create(
    data: Omit<Area, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Area>;

  abstract findAllWithPagination({
    paginationOptions,
    warehouseId,
  }: {
    paginationOptions: IPaginationOptions;
    warehouseId?: string;
  }): Promise<Area[]>;

  abstract findById(id: Area['id']): Promise<NullableType<Area>>;

  abstract findByIds(ids: Area['id'][]): Promise<Area[]>;

  abstract update(
    id: Area['id'],
    payload: DeepPartial<Area>,
  ): Promise<Area | null>;

  abstract remove(id: Area['id']): Promise<void>;
}
