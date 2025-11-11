import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Delivery } from '../../domain/delivery';

export abstract class DeliveryRepository {
  abstract create(
    data: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Delivery>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Delivery[]>;

  abstract findById(id: Delivery['id']): Promise<NullableType<Delivery>>;

  abstract findByIds(ids: Delivery['id'][]): Promise<Delivery[]>;

  abstract update(
    id: Delivery['id'],
    payload: DeepPartial<Delivery>,
  ): Promise<Delivery | null>;

  abstract remove(id: Delivery['id']): Promise<void>;
}
