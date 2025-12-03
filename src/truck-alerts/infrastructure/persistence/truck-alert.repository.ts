import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { TruckAlert } from '../../domain/truck-alert';

export abstract class TruckAlertRepository {
  abstract create(
    data: Omit<TruckAlert, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TruckAlert>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<TruckAlert[]>;

  abstract findById(id: TruckAlert['id']): Promise<NullableType<TruckAlert>>;

  abstract findByIds(ids: TruckAlert['id'][]): Promise<TruckAlert[]>;

  abstract update(
    id: TruckAlert['id'],
    payload: DeepPartial<TruckAlert>,
  ): Promise<TruckAlert | null>;

  abstract remove(id: TruckAlert['id']): Promise<void>;

  abstract findActiveAlertByTruckId(
    truckId: string,
  ): Promise<NullableType<TruckAlert>>;
}
