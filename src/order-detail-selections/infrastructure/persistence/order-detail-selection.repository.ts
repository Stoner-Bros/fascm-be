import { OrderDetail } from 'src/order-details/domain/order-detail';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderDetailSelection } from '../../domain/order-detail-selection';

export abstract class OrderDetailSelectionRepository {
  abstract create(
    data: Omit<OrderDetailSelection, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderDetailSelection>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderDetailSelection[]>;

  abstract findById(
    id: OrderDetailSelection['id'],
  ): Promise<NullableType<OrderDetailSelection>>;

  abstract findByIds(
    ids: OrderDetailSelection['id'][],
  ): Promise<OrderDetailSelection[]>;

  abstract update(
    id: OrderDetailSelection['id'],
    payload: DeepPartial<OrderDetailSelection>,
  ): Promise<OrderDetailSelection | null>;

  abstract remove(id: OrderDetailSelection['id']): Promise<void>;

  abstract removeAllByOrderDetailId(
    orderDetailId: OrderDetail['id'],
  ): Promise<void>;
}
