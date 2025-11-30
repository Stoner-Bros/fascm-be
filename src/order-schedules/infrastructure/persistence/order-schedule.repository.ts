import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderSchedule } from '../../domain/order-schedule';

export abstract class OrderScheduleRepository {
  abstract create(
    data: Omit<OrderSchedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderSchedule>;

  abstract findAllWithPagination({
    paginationOptions,
    filters,
    sort,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: {
      status?: OrderSchedule['status'];
    };
    sort?: 'ASC' | 'DESC';
  }): Promise<OrderSchedule[]>;

  abstract findById(
    id: OrderSchedule['id'],
  ): Promise<NullableType<OrderSchedule>>;

  abstract findByIds(ids: OrderSchedule['id'][]): Promise<OrderSchedule[]>;

  abstract update(
    id: OrderSchedule['id'],
    payload: DeepPartial<OrderSchedule>,
  ): Promise<OrderSchedule | null>;

  abstract remove(id: OrderSchedule['id']): Promise<void>;
}
