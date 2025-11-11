import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Truck } from '../../domain/truck';

export abstract class TruckRepository {
  abstract create(
    data: Omit<Truck, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Truck>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Truck[]>;

  abstract findById(id: Truck['id']): Promise<NullableType<Truck>>;

  abstract findByIds(ids: Truck['id'][]): Promise<Truck[]>;

  abstract update(
    id: Truck['id'],
    payload: DeepPartial<Truck>,
  ): Promise<Truck | null>;

  abstract remove(id: Truck['id']): Promise<void>;
}
