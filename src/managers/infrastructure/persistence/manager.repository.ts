import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Manager } from '../../domain/manager';

export abstract class ManagerRepository {
  abstract create(
    data: Omit<Manager, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Manager>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Manager[]>;

  abstract findById(id: Manager['id']): Promise<NullableType<Manager>>;

  abstract findByUserId(userId: number): Promise<NullableType<Manager>>;

  abstract findByIds(ids: Manager['id'][]): Promise<Manager[]>;

  abstract update(
    id: Manager['id'],
    payload: DeepPartial<Manager>,
  ): Promise<Manager | null>;

  abstract remove(id: Manager['id']): Promise<void>;
}
