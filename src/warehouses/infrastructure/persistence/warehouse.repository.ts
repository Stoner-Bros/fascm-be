import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Warehouse } from '../../domain/warehouse';

export abstract class WarehouseRepository {
  abstract create(
    data: Omit<Warehouse, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Warehouse>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Warehouse[]>;

  abstract findById(id: Warehouse['id']): Promise<NullableType<Warehouse>>;

  abstract findByIds(ids: Warehouse['id'][]): Promise<Warehouse[]>;

  abstract update(
    id: Warehouse['id'],
    payload: DeepPartial<Warehouse>,
  ): Promise<Warehouse | null>;

  abstract remove(id: Warehouse['id']): Promise<void>;
}
