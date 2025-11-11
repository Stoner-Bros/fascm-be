import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderDetail } from '../../domain/order-detail';

export abstract class OrderDetailRepository {
  abstract create(
    data: Omit<OrderDetail, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderDetail>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderDetail[]>;

  abstract findById(id: OrderDetail['id']): Promise<NullableType<OrderDetail>>;

  abstract findByIds(ids: OrderDetail['id'][]): Promise<OrderDetail[]>;

  abstract update(
    id: OrderDetail['id'],
    payload: DeepPartial<OrderDetail>,
  ): Promise<OrderDetail | null>;

  abstract remove(id: OrderDetail['id']): Promise<void>;
}
