import { Order } from 'src/orders/domain/order';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderDetail } from '../../domain/order-detail';
import { OrderDetailResponseDto } from 'src/order-details/dto/order-detail-response.dto';

export abstract class OrderDetailRepository {
  abstract create(
    data: Omit<OrderDetail, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderDetail>;

  abstract findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { orderId?: string };
  }): Promise<OrderDetail[]>;

  abstract findById(id: OrderDetail['id']): Promise<NullableType<OrderDetail>>;

  abstract findByIds(ids: OrderDetail['id'][]): Promise<OrderDetail[]>;

  abstract findByOrderId(
    orderId: Order['id'],
  ): Promise<NullableType<OrderDetailResponseDto[]>>;

  abstract update(
    id: OrderDetail['id'],
    payload: DeepPartial<OrderDetail>,
  ): Promise<OrderDetail | null>;

  abstract remove(id: OrderDetail['id']): Promise<void>;
}
